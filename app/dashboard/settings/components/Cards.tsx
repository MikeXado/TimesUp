"use client";
import CardSettings from "./CardSettings";
import CardProfile from "./CardProfile";
import { useForm, UseFormReturn, FieldValues } from "react-hook-form";
import { SettingsFormInputType, UserData } from "../../../../types";
export default function Cards({ currentUser }: { currentUser: UserData }) {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState:{errors}
  }: UseFormReturn<FieldValues> = useForm<FieldValues>({
    defaultValues: {
      displayName: currentUser.displayName,
      email: currentUser.email,
      city: currentUser.city ? currentUser.city : "",
      country: currentUser.country ? currentUser.country : "",
      about: currentUser.about ? currentUser.about : "",
      photoUrl: currentUser.photoUrl
        ? currentUser.photoUrl
        : "https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144",
    },
  });

  return (
    <div className="flex flex-wrap overflow-auto mt-24 h-screen pb-20">
      <div className="w-full lg:w-8/12 px-4">
        <CardSettings
          register={register}
          handleSubmit={handleSubmit}
          currentUserUid={currentUser.uid}
          setValue={setValue}
          watch={watch}
          errors={errors}
        />
      </div>
      <div className="w-full lg:w-4/12 px-4">
        <CardProfile watch={watch} />
      </div>
    </div>
  );
}
