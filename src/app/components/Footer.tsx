/**
 * v0 by Vercel.
 * @see https://v0.dev/t/3eqJ67HOo2y
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"

export default function Component() {
  return (
    <footer className="dark:bg-[black] text-gray-400 py-12 md:py-16 lg:py-20">
      <div className="container max-w-7xl mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-300">Products</h4>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-gray-200 transition-colors" prefetch={false}>
                Features
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-200 transition-colors" prefetch={false}>
                Integrations
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-200 transition-colors" prefetch={false}>
                Pricing
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-200 transition-colors" prefetch={false}>
                FAQs
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-300">Resources</h4>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-gray-200 transition-colors" prefetch={false}>
                Documentation
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-200 transition-colors" prefetch={false}>
                Guides
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-200 transition-colors" prefetch={false}>
                Videos
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-200 transition-colors" prefetch={false}>
                Community
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-300">Legal</h4>
          <ul className="space-y-2">
            <li>
              <Link href="Terms-&-Conditions" className="hover:text-gray-200 transition-colors" prefetch={false}>
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/Privacy-Policy" className="hover:text-gray-200 transition-colors" prefetch={false}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/Privacy-Policy" className="hover:text-gray-200 transition-colors" prefetch={false}>
                Cookie Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-200 transition-colors" prefetch={false}>
                Compliance
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mt-8 md:mt-12 lg:mt-16 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-gray-500">&copy; 2024 {process.env.COMPANY_NAME} Inc. All rights reserved.</p>
      </div>
    </footer>
  )
}

