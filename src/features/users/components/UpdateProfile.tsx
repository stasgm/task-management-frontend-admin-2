import { PencilIcon } from '@heroicons/react/solid';
import * as z from 'zod';

import { UpdateProfileDTO, useUpdateProfile } from '../api/updateProfile';

import { Button } from '@/components/Elements';
import { Form, FormDrawer, InputField } from '@/components/Form';
import { useAuth } from '@/lib/auth';

const schema = z.object({
  username: z.string().min(1, 'Required'),
  firstName: z.string(),
  lastName: z.string(),
});

export const UpdateProfile = () => {
  const { user } = useAuth();
  const updateProfileMutation = useUpdateProfile();

  return (
    <FormDrawer
      isDone={updateProfileMutation.isSuccess}
      triggerButton={
        <Button startIcon={<PencilIcon className="h-4 w-4" />} size="sm">
          Update Profile
        </Button>
      }
      title="Update Profile"
      submitButton={
        <Button
          form="update-profile"
          type="submit"
          size="sm"
          isLoading={updateProfileMutation.isLoading}
        >
          Submit
        </Button>
      }
    >
      <Form<UpdateProfileDTO['data'], typeof schema>
        id="update-profile"
        onSubmit={async (values) => {
          await updateProfileMutation.mutateAsync({ data: values });
        }}
        options={{
          defaultValues: {
            firstName: user?.firstName,
            lastName: user?.lastName,
            username: user?.username,
          },
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <InputField
              label="First Name"
              error={formState.errors['firstName']}
              registration={register('firstName')}
            />
            <InputField
              label="Last Name"
              error={formState.errors['lastName']}
              registration={register('lastName')}
            />
            <InputField
              label="username"
              type="text"
              error={formState.errors['username']}
              registration={register('username')}
            />
          </>
        )}
      </Form>
    </FormDrawer>
  );
};
