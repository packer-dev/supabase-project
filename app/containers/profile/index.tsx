import { TriangleAlert } from 'lucide-react';
import FormProfile from './form-profile';
import FormPassword from './form-password';
import { Button } from '@/components/ui/button';
import { FormAvatar } from './form-avatar';

const Profile = () => {
  return (
    <div className="w-3/4 py-8 mx-auto flex flex-col gap-8">
      <FormAvatar />
      <section className="shadow border border-gray-100 border-solid p-5 rounded-sm">
        <div className="grid grid-cols-2">
          <span className="font-bold">General settings</span>
          <FormProfile />
        </div>
      </section>

      <section className="shadow border border-gray-100 border-solid p-5 rounded-sm">
        <div className="grid grid-cols-2">
          <span className="font-bold">Change password</span>
          <FormPassword />
        </div>
      </section>

      <p className="font-semibold text-xl">Delete account</p>
      <section className="shadow border border-gray-100 border-solid p-5 rounded-sm">
        <div className="p-3 rounded-sm border border-solid border-red-500 flex gap-4 items-start">
          <TriangleAlert className="text-red-500 mt-2" />
          <div>
            <p className="font-semibold">
              Deleting this project will also remove your database.
            </p>
            <p className="text-gray-500">
              Make sure you have made a backup if you want to keep your data.
            </p>
            <Button className="p-2 h-8 rounded bg-red-500 mt-2 hover:bg-red-400">
              Delete account
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
