const Footer = () => {
    return (
        <div className="flex flex-row gap-2 mt-20 items-center justify-center w-full">
            {/* <a className="text-xs text-gray-500" href="https://codepen.io/sho-obum/pen/zYWzLNN">
                DarkMode Toggle
            </a> */}
            <a href="https://github.com/Light2Dark" className="hover:scale-105">
                <img className="h-10" src="Octocat.png" alt="GitHub Logo" />
            </a>
        </div>
    )
}

export default Footer