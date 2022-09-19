import Link from 'next/link'

export default function Layout({ children }) {
    return (
        <div className="h-screen p-6">
            <div>
                <header className="flex justify-between">
                    <div className="flex items-center">
                        <h1 className="text-3xl">OnMagellanic</h1>
                        <h4 className="ml-8"><Link href="/challenges"><a>Challenges</a></Link></h4>
                    </div>
                    <button className="px-4 py-2 text-lg border border-orange-600">Login</button>
                </header>
                <main>
                    {children}
                </main>
            </div>

            <footer>
                <div className="mt-8 mb-6 border border-grey-600"></div>
                <div className="flex justify-between">
                    <p>Life is in this moment. There is no other meaning of life.</p>
                    <div><a href="https://twitter.com/cheenukhurana" target="_blank" className="fa fa-twitter"></a></div>
                </div>
            </footer>
        </div>
    )
}