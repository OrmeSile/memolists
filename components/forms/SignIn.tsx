'use client'
import {ClientSafeProvider, getProviders, LiteralUnion, signIn} from "next-auth/react";
import {useContext, useEffect, useState} from "react";
// @ts-ignore
import signInStyles from "@/styles/auth/signin.module.css"
import Image from "next/image";

export const SignIn = () => {
    const [providers, setProviders] = useState<any>(null)
    useEffect(() => {
        (async () => {
            const fetchedProviders = await getProviders()
            setProviders(fetchedProviders)
        })()
    }, []);
    return (
        <>
            {providers && Object.values(providers).map((provider: any) => {
                return (
                    <>
                        <div key={provider.name} className={signInStyles.provider}>
                            <button className={signInStyles.button}
                                    onClick={() => signIn(provider.id, {redirect: true, callbackUrl: '/home'})}>
                                <Image className={signInStyles.icon} width={24} height={24}
                                       src={`/icons/providers/${provider.name.toLowerCase()}.svg`}
                                       alt={`${provider.name} icon`}/>
                                <p className={signInStyles.text}>Sign in with {provider.name}</p>
                            </button>
                        </div>
                    </>
                )
            })}
        </>
    )
}