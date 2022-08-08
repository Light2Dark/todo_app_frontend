import axios from "axios"

type AuthProps = {
    title: string
    subtitle: string
    setSigningIn: (signingIn: boolean) => void
    setSigningUp: (signingUp: boolean) => void
    submitText: string
    loginComponent: boolean
}

const Auth = ({title, subtitle, setSigningIn, setSigningUp, submitText, loginComponent}: AuthProps) => {
    const openSignUp = () => {
        setSigningIn(false)
        setSigningUp(true)
    }
    
    const openSignIn = () => {
        setSigningIn(true)
        setSigningUp(false)
    }

    // close signIn box
    const closeSignIn = () => {
        setSigningIn(false)
    }

    // close signUp box
    const closeSignUp = () => {
        setSigningUp(false)
    }

    // if user closes the sign in/up box, remove the background blur and return to normal state
    const handleClose = () => {
        if (loginComponent) {
            closeSignIn()
        } else {
            closeSignUp()
        }
    }

    // if user clicks the sign in/up button, add the background blur and open the sign in/up box
    const handleOpen = () => {
        if (loginComponent) {
            openSignUp()
        } else {
            openSignIn()
        }
    }

    interface AuthFormProps {
        email: string
        password: string
        event?: any
    }

    const loginToServer = ({email, password}: AuthFormProps) => {
        let body = {
            "email": email,
            "password": password
        }

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, body).then(res => {
            console.log(res)
            if (res.data.status_code === 200) { // successfully logged in
                // let token = res.data.token
                sessionStorage.setItem("user_id", res.data.user_id) // used for database
                window.location.reload() // refresh browser so that it will load the db
                closeSignIn()
                alert(res.data.message)
            } else if (res.data.status_code === 400) { // bad request
                alert(res.data.detail) // IDK HOW TO MATCH SCHEMA OF BACKEND TO FRONTEND, INSTEAD WE HAVE TO CODE EXPECTED OUTPUT MANUALLY, which feels dumb
            }
        }).catch(err => {
            console.log(err)
        })
    }

    const signupToServer = ({email, password}: AuthFormProps) => {
        let body = {
            "email": email,
            "password": password
        }

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/signup`, body).then(res => {
            if (res.status === 201) { // successful user created
                closeSignUp()
                alert(res.data.message + ". Please login again")
            } else if (res.data.status_code === 400) { // bad request
                alert(res.data.detail)
            }   
        })
    }

    const handleSubmit = (event: any) => {
        event && event.preventDefault()
        let email = event.target.email.value
        let password = event.target.password.value
        loginComponent ? loginToServer({email, password}) : signupToServer({email, password})

        event.target.reset() // reset form
    }

    return (
        <>
            <div className="flex flex-row justify-center items-center relative">
                <h2 className="text-3xl text-pale-red font-bold m-auto">{title}</h2>
                <button className="absolute right-0 bg-slate-800 rounded-full font-bold text-red-400 cursor-pointer hover:border-2 hover:border-pale-orange h-8 w-8 flex justify-center items-center" aria-label="close" onClick={handleClose}>X</button>
            </div>
            <p className="text-center mt-3">or <button className="text-sky-300 cursor-pointer hover:underline text-md" onClick={handleOpen}>{subtitle}</button></p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4 items-center w-full">
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-semibold text-lg text-fuchsia-200">Email</label>
                    <input type="email" name="email" id="email" required placeholder="jenna@gmail.com" className="rounded-sm py-1 px-1 text-black w-64" />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="font-semibold text-lg text-fuchsia-200">Password</label>
                    <input type="password" name="password" id="password" required placeholder="*******" className="rounded-sm py-1 px-1 text-black w-64" minLength={5} />
                </div>

                <button type="submit" className="cursor-pointer bg-black px-4 py-2 rounded-lg">{submitText}</button>
            </form>
        </>
    )
}

export default Auth