import { useState, useCallback } from "react";
import axios from "axios";
import Input from "@/components/Input";
import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Auth = () => {
    // const router = useRouter();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const [variant, setVariant] = useState("login");

    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) =>
            currentVariant === "login" ? "register" : "login"
        );
    }, []);

    const login = useCallback(async () => {
        try {
            const res = await signIn("credentials", {
                // pass the ID of the provider defined inside api/[...nextauth].ts
                email: email,
                password: password,
                // redirect: false,
                callbackUrl: "/profiles",
            });

            // router.push("/");

            // console.log(res);
        } catch (err) {
            console.log(err);
        }
    }, [email, password]);

    const register = useCallback(async () => {
        try {
            await axios.post("/api/register", {
                email: email,
                name: name,
                password: password,
            });

            login();
        } catch (err) {
            console.log(err);
        }
    }, [email, name, password, login]);

    return (
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <img
                        src="/images/logo.png"
                        alt="Logo"
                        className="h-12"
                    ></img>
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            {variant === "login" ? "Sign In" : "Register"}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {variant === "register" && (
                                <Input
                                    label="UserName"
                                    onChange={(e: {
                                        target: { value: string };
                                    }) => {
                                        setName(e.target.value);
                                    }}
                                    id="name"
                                    value={name}
                                />
                            )}
                            <Input
                                label="Email"
                                onChange={(e: {
                                    target: { value: string };
                                }) => {
                                    setEmail(e.target.value);
                                }}
                                id="email"
                                type="email"
                                value={email}
                            />
                            <Input
                                label="Password"
                                onChange={(e: {
                                    target: { value: string };
                                }) => {
                                    setPassword(e.target.value);
                                }}
                                id="password"
                                type="password"
                                value={password}
                            />
                        </div>
                        <button
                            className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 focus:bg-red-700 transition"
                            onClick={variant === "login" ? login : register}
                        >
                            {variant === "login" ? "Login" : "Sign Up"}
                        </button>
                        <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                            <div
                                className="
                                    w-10
                                    h-10
                                    bg-white
                                    rounded-full
                                    flex
                                    items-center
                                    justify-center
                                    cursor-pointer
                                    hover:opacity-80
                                    transition
                                "
                                onClick={async () =>
                                    await signIn("google", { callbackUrl: "/profiles" })
                                }
                            >
                                <FcGoogle size={30} />
                            </div>
                            <div
                                className="
                                    w-10
                                    h-10
                                    bg-white
                                    rounded-full
                                    flex
                                    items-center
                                    justify-center
                                    cursor-pointer
                                    hover:opacity-80
                                    transition
                                "
                                onClick={async () =>
                                    await signIn("github", { callbackUrl: "/profiles" })
                                }
                            >
                                <FaGithub size={30} />
                            </div>
                        </div>
                        <p className="text-neutral-500 mt-12">
                            {variant === "login"
                                ? "First time using Netflix?"
                                : "Already have an account?"}
                            <span
                                onClick={toggleVariant}
                                className="text-white ml-1 hover:underline cursor-pointer"
                            >
                                {variant === "login"
                                    ? "Create an account"
                                    : "Sign In"}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
