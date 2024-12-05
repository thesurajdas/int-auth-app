import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col h-screen justify-center items-center">
      <h1 className="text-3xl font-medium">Hello NextJS</h1>
      <p>Welcome to our site</p>
      <div className="flex gap-4">
        <Link
          href={"/login"}
          className="p-2 bg-green-500 rounded-md text-white">
          Login
        </Link>
        <Link
          href={"/register"}
          className="p-2 bg-blue-500 rounded-md text-white">
          Register
        </Link>
      </div>
    </main>
  );
}
