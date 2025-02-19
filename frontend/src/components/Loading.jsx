export default function Loading() {
  return (
    <div className="flex justify-center mt-4">
      <svg
        className="animate-spin h-6 w-6 text-green-500"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"
        />
      </svg>
    </div>
  );
}
