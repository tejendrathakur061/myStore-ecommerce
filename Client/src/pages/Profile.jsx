import { useEffect, useState } from "react";
import api from "../utils/api";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await api("/auth/profile");
        setProfile({
          ...data.user,
          id: data.user._id,
        });
      } catch (error) {
        console.error("Profile fetch failed:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <p className="p-6 text-center">Loading profile...</p>;
  }

  return !profile ? (
    <div className="flex min-h-[60vh] items-center justify-center bg-[#F5F5F0] px-5">
      <div className="w-full max-w-md rounded-2xl border border-[#E7E5DC] bg-[#FCFCF8] p-8 text-center shadow-md">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-2xl font-bold text-red-600">
          ⚠️
        </div>
        <h2 className="text-xl font-semibold text-[#293E30]">User Not Found</h2>
        <p className="mt-2 text-sm leading-6 text-[#777A70]">
          We couldn't find your profile information.
        </p>
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-[#F5F5F0] px-5 py-10 text-[#292D28] sm:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#7C897B]">
            Account Settings
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-[#293E30]">
            My Profile
          </h1>
          <p className="mt-2 text-sm text-[#777A70]">
            Manage and view your account information.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-[#E7E5DC] bg-[#FCFCF8] shadow-md">
          <div className="h-28 bg-linear-to-r from-[#293E30] to-[#3A5140] sm:h-36" />

          <div className="px-6 pb-8 sm:px-10">
            <div className="-mt-12 mb-8 flex flex-col gap-4 border-b border-[#E7E5DC] pb-6 sm:-mt-14 sm:flex-row sm:items-center sm:gap-6 relative z-10">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-[#FCFCF8] bg-[#293E30] text-3xl font-bold uppercase text-white shadow-lg">
                {profile.name?.charAt(0) || "U"}
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="wrap-break-words text-2xl font-semibold tracking-tight text-[#E8EDE7]">
                  {profile.name}
                </h2>
                <p className="mt-1 break-all text-sm text-[#777A70]">
                  {profile.email}
                </p>
              </div>
            </div>

            <div className="mb-5">
              <h3 className="text-base font-semibold text-[#293E30]">
                Personal Information
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-[#E7E5DC] bg-white/70 p-5 shadow-sm transition hover:shadow-md hover:bg-white">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#85887D]">
                  Full Name
                </p>
                <p className="wrap-break-words text-base font-medium text-[#292D28]">
                  {profile.name}
                </p>
              </div>

              <div className="rounded-xl border border-[#E7E5DC] bg-white/70 p-5 shadow-sm transition hover:shadow-md hover:bg-white">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#85887D]">
                  Email Address
                </p>
                <p className="break-all text-base font-medium text-[#292D28]">
                  {profile.email}
                </p>
              </div>

              <div className="rounded-xl border border-[#E7E5DC] bg-white/70 p-5 shadow-sm transition hover:shadow-md hover:bg-white sm:col-span-2">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#85887D]">
                  User ID
                </p>
                <p className="break-all font-mono text-sm text-[#293E30]">
                  {profile.id}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
