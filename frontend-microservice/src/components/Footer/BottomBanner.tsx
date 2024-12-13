import { Link } from "react-router-dom";


export default function BottomBanner() {
    const currentYear = new Date().getFullYear(); // Get the current year

    return (
        <>
            <div className='bg-transparent border-t mt-5 py-2'>
                <div className="container mx-auto">
                    <div className='h-auto w-full'>
                        <div className='flex flex-wrap lg:justify-between justify-center text-[14px] '>
                            <div className='flex items-center font-medium'>
                                <p>&copy; Copyright {currentYear} Mero Hostel Mate. All Rights Reserved.</p>
                            </div>
                            <div className='font-medium'>
                                <Link to={"/privacypolicy"}>
                                    <a className="px-2 border-r border-black " href="#">Privacy Policy</a>
                                </Link>
                                <Link to={"/termsandcondition"}>
                                    <a className="pl-2" href="#">Terms and Conditions</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
