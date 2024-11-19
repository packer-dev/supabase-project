"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Uppy from "@uppy/core";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dashboard } from "@uppy/react";
import ImageEditor from "@uppy/image-editor";
import GoldenRetriever from "@uppy/golden-retriever";
import { Camera, Upload } from "lucide-react";
import { useApi } from "@/services/api";
import Tus from "@uppy/tus";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import "@uppy/image-editor/dist/style.min.css";
import Image from "next/image";

export const FormAvatar = () => {
  const STORAGE_BUCKET = "files";
  const [open, setOpen] = useState(false);

  const uppyRef = useRef<Uppy>(new Uppy());

  useEffect(() => {
    uppyRef.current = new Uppy({
      restrictions: {
        maxFileSize: 2 * 1024 * 1024, // 2MB
        maxNumberOfFiles: 5,
        allowedFileTypes: [
          "image/*",
          "video/*",
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-powerpoint",
          "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        ],
      },
      autoProceed: false,
    })
      .use(ImageEditor)
      .use(GoldenRetriever, { serviceWorker: true })
      .use(Tus, {
        endpoint: "",
        retryDelays: [0, 3000, 5000, 10000, 20000],
        chunkSize: 6 * 1024 * 1024,
        removeFingerprintOnSuccess: true,
        headers: () => {
          const accessToken = "";
          return {
            "x-upsert": "true",
            Authorization: `Bearer ${accessToken}`,
          };
        },
        uploadDataDuringCreation: true,
        allowedMetaFields: [
          "bucketName",
          "objectName",
          "contentType",
          "cacheControl",
        ],
        onError: function (error) {
          console.log("Failed because: " + error);
        },
        onShouldRetry(err, retryAttempt, options, next) {
          if (err?.originalResponse?.getStatus() === 401) {
            return true;
          }
          return next(err);
        },
        async onAfterResponse(req, res) {
          if (res.getStatus() === 401) {
            // await refreshAuthToken();
          }
        },
      });

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log(
            "ServiceWorker registration successful with scope: ",
            registration.scope
          );
        })
        .catch((error) => {
          console.log(`Registration failed with ${error}`);
        });
    }

    uppyRef.current.on("file-added", (file) => {
      const supabaseMetadata = {
        bucketName: STORAGE_BUCKET,
        objectName: ``,
        contentType: file.type,
      };

      file.meta = {
        ...file.meta,
        ...supabaseMetadata,
      };
      const files = uppyRef.current.getFilesByIds(["imagessss"]);
      uppyRef.current.emit("file-editor:start", files[0]);
    });
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <section className="w-40 h-40 rounded-full relative overflow-hidden">
        <Image
          src="https://picsum.photos/536/354"
          alt=""
          className="rounded-full"
          fill
        />
        <label
          htmlFor="avatar-image"
          className="absolute bg-black bottom-0 w-full h-6 py-0.5 rounded-full cursor-pointer"
        >
          <Camera color="white" size={16} className="mx-auto" />
        </label>
        <input
          type="file"
          id="avatar-image"
          onChange={(event) => {
            if (event.target.files?.length && uppyRef.current) {
              const file = event.target.files[0];
              //   const supabaseMetadata = {
              //     bucketName: STORAGE_BUCKET,
              //     objectName: ``,
              //     contentType: file.type,
              //   };

              //   file.meta = {
              //     ...file.meta,
              //     ...supabaseMetadata,
              //   };
              uppyRef.current.addFile({
                name: file.name,
                type: file.type,
                data: file,
                source: "Local",
                isRemote: false,
                id: "imagessss",
              });
              setOpen(true);
            }
          }}
        />
      </section>
      <DialogContent className="w-[600px]">
        <DialogHeader>
          <DialogTitle>Upload Files</DialogTitle>
          <DialogDescription>
            Upload your files here. You can upload up to 5 files, with a maximum
            size of 10MB each. Supported file types include images, videos,
            PDFs, and Microsoft Office documents.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full">
          <Dashboard
            proudlyDisplayPoweredByUppy={false}
            uppy={uppyRef.current}
            hideCancelButton
          />
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            color="secondary"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
