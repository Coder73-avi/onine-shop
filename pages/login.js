import Breadcrumbs from "components/Breadcrumbs";
import LoginForm from "components/MyForm/LoginForm";
import SignUpForm from "components/MyForm/SignUpForm";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Breadcrumbs location={[{ name: "Login", path: "/login" }]} />
      <main className="w-[90%] mx-auto">
        {router.query?.type == "signup" ? <SignUpForm /> : <LoginForm />}
      </main>
    </>
  );
}
