import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F5F0] px-5">
      <div className="w-full max-w-md rounded-3xl border border-[#E7E5DC] bg-[#FCFCF8] p-8 text-center shadow-md">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#E8EDE7] text-3xl font-bold text-[#293E30]">
          404
        </div>

        <h1 className="text-2xl font-bold text-[#293E30]">Page Not Found</h1>
        <p className="mt-2 text-sm text-[#777A70]">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/"
            className="rounded-lg bg-[#293E30] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#3A5140]"
          >
            Return to store
          </Link>
          <Link
            to="/login"
            className="rounded-lg border border-[#293E30] px-5 py-2 text-sm font-medium text-[#293E30] transition hover:bg-[#E8EDE7]"
          >
            Sign in
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ErrorPage;
