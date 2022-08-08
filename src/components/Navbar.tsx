import { useState } from "react"
import Toggle from "./Toggle"
import {Auth} from "./Auth"

type NavbarProps = {
    setDarkTheme: any
    darkTheme: boolean
    signedIn: boolean
}

export interface AuthProps {
    setSigningIn: (signingIn: boolean) => void
    setSigningUp: (signingUp: boolean) => void
}

const Navbar = ({setDarkTheme, darkTheme, signedIn}: NavbarProps) => {
    const [signingIn, setSigningIn] = useState(false)
    const [signingUp, setSigningUp] = useState(false)

    return (
        <div className="w-full py-4 bg-pale-purple dark:bg-slate-800 flex flex-row items-center transition-colors">
            <img className="pl-4 w-16" src="smolwafflenotext.svg" alt="Smolwaffle logo"/>
            <p className="text-lg font-semibold pl-4 hidden sm:block dark:text-pale-red">Smolwaffle</p>
            
            <div className="ml-auto mr-4 flex flex-row gap-2">
                {
                    signedIn ? 
                        <button className="bg-pale-dark-blue text-pale-cream px-2 rounded-md mr-4">Signed In</button> :
                    <>
                        <button className="bg-pale-dark-blue text-pale-cream px-2 rounded-md" onClick={() => {setSigningIn(true)}}>Log In</button>
                        <button className="bg-pale-dark-blue text-pale-cream px-2 rounded-md mr-4" onClick={() => {setSigningUp(true)}}>Sign Up</button>
                    </>
                }

                {
                    (signingIn || signingUp) &&
                    <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center backdrop-blur-sm">
                        <div className="h-2/4 w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/3 bg-pale-dark-blue rounded-md p-3 text-white">
                            {signingIn && <Auth title="Login" subtitle="Create an account" submitText="Log In" setSigningIn={setSigningIn} setSigningUp={setSigningUp} loginComponent={true} />}

                            {signingUp && <Auth title="Sign Up" subtitle="Already have an account?" submitText="Sign Up" setSigningIn={setSigningIn} setSigningUp={setSigningUp} loginComponent={false} />}
                        </div>
                    </div>
                }
                <Toggle darkMode={darkTheme} setDarkMode={setDarkTheme} />
            </div>
        </div>
    )
}

export default Navbar