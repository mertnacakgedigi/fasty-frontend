import CallToActionClient from '@/app/call-to-action.client';

export default function Home() {
  return (
    <div>
      <header className='fixed w-full'>
        <nav className='bg-white border-gray-200 py-2.5'>
          <div className='flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto'>
            <a href='#' className='flex items-center'>
              <img
                src='./images/icon.svg'
                className='object-fill h-20 sm:h-20 scale-150'
                alt='Fasty Logo'
              />
              <span className='self-center text-xl font-semibold whitespace-nowrap'>
                Fasty
              </span>
            </a>
            <div className='flex items-center lg:order-2'>
              <a
                href='https://www.fastyrelay.com/login'
                className='text-red-900 hover:bg-secondary border-2 border-red-900  font-medium rounded-lg text-lg px-2 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 '
              >
                Login
              </a>
            </div>
          </div>
        </nav>
      </header>

      <section className='bg-white'>
        <div className='grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28'>
          <div className='mr-auto place-self-center lg:col-span-7'>
            <h1 className='max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl'>
              Revolutionizing Load Booking on Amazon Relay
            </h1>
            <p className='max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl'>
              Fasty isn&apos;t a simple browser extension— it&apos;s a robust
              software platform that seamlessly integrates with Amazon Relay.
              Our system is built to automate your load booking process based on
              your filters. With the capacity to book loads 10x faster than our
              competitors, we are the game-changer in the industry.
            </p>
            <CallToActionClient />
            {/*<div className='space-y-4 sm:flex sm:space-y-0 sm:space-x-4'>*/}
            {/*  <a*/}
            {/*    href='https://www.fastyrelay.com/login'*/}
            {/*    className='inline-flex items-center justify-center w-full px-5 py-3 text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100'*/}
            {/*  >*/}
            {/*    Login*/}
            {/*  </a>*/}
            {/*</div>*/}
          </div>
          <div className='lg:mt-0 lg:col-span-5 lg:flex'>
            <img src='./images/welcome.gif' alt='hero image' />
          </div>
        </div>
      </section>

      <section className='bg-gray-50'>
        <div className='max-w-screen-xl px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:py-24 lg:px-6'>
          <div className='items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16'>
            <div className='w-full mb-4 rounded-lg lg:mb-0 lg:flex'>
              <img
                src='./images/performance.png'
                width='100%'
                style={{ height: '300px' }}
              />
            </div>
            <div className='text-gray-500 sm:text-lg'>
              <h2 className='mb-4 text-3xl font-extrabold tracking-tight text-gray-900'>
                Triple your revenue
              </h2>
              <p className='mb-8 font-light lg:text-xl'>
                Where others see a load board, we see opportunity - an
                opportunity to streamline, simplify and accelerate the load
                booking process. Our software doesn&apos;t just make booking
                easier, it makes it faster and more accurate. This speed and
                precision let you book more loads, enabling you to grow your
                business like never before.
              </p>

              <ul
                role='list'
                className='pt-8 space-y-5 border-t border-gray-200 my-7'
              >
                <li className='flex space-x-3'>
                  <svg
                    className='flex-shrink-0 w-5 h-5 text-green-500'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                  <span className='text-base font-medium leading-tight text-gray-900'>
                    <strong>Speed:</strong> Our software books loads 10x faster
                    than our competitors.{' '}
                  </span>
                </li>
                <li className='flex space-x-3'>
                  <svg
                    className='flex-shrink-0 w-5 h-5 text-green-500'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                  <span className='text-base font-medium leading-tight text-gray-900'>
                    <strong>Ease of Use:</strong> Our user-friendly interface
                    simplifies your load booking process..
                  </span>
                </li>
                <li className='flex space-x-3'>
                  <svg
                    className='flex-shrink-0 w-5 h-5 text-green-500'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                  <span className='text-base font-medium leading-tight text-gray-900'>
                    <strong>Customization:</strong> Our system adapts to your
                    individual needs and preferences.
                  </span>
                </li>
                <li className='flex space-x-3'>
                  <svg
                    className='flex-shrink-0 w-5 h-5 text-green-500'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                  <span className='text-base font-medium leading-tight text-gray-900 X'>
                    <strong>Growth:</strong> With faster booking, you can accept
                    more loads, leading to more profit.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className='bg-white'>
        <div className='max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-24 lg:px-6'>
          <figure className='max-w-screen-md mx-auto'>
            <svg
              className='h-12 mx-auto mb-3 text-gray-400'
              viewBox='0 0 24 27'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z'
                fill='currentColor'
              />
            </svg>
            <blockquote>
              <p className='text-xl font-medium text-gray-900 md:text-2xl'>
                &rdquo;Switching to Fasty has been the best decision we&apos;ve
                made. Their revolutionary booking platform skyrocketed our
                efficiency, enabling us to triple our revenue in just a month.
                The impact was so immense that we&apos;re now in the process of
                hiring more drivers just to keep up with the rapid pace of load
                booking facilitated by Fasty. If you&apos;re in search of an
                innovative and robust tool to streamline your load booking and
                boost your growth, Fasty is the ultimate solution.&rdquo;{' '}
              </p>
            </blockquote>
            <figcaption className='flex items-center justify-center mt-6 space-x-3'>
              {/*<img className="w-6 h-6 rounded-full"*/}
              {/*     src="https://media.licdn.com/dms/image/C5603AQG7mz1zQfiOZg/profile-displayphoto-shrink_800_800/0/1522461688921?e=1683763200&v=beta&t=WzW9n4u242EF2DKp1Qn20AzJ8o9ZK0wxnrJ1GnpHZL4"*/}
              {/*     alt="profile picture"/>*/}
              <div className='flex items-center divide-x-2 divide-gray-500'>
                <div className='pr-3 font-medium text-gray-900'>Mike</div>
                <div className='pl-3 text-sm font-light text-gray-500'>
                  Multiple 7-figure Amazon Relay Carrier
                </div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className='bg-gray-50'>
        <div className='max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6'>
          <div className='max-w-screen-sm mx-auto text-center'>
            <h2 className='mb-4 text-3xl font-extrabold leading-tight tracking-tight text-gray-900'>
              Try Fasty for free
            </h2>
            <p className='mb-6 font-light text-gray-500 md:text-lg'>
              Say goodbye to load board and hello to streamlined booking with
              Fasty. Try it today and see the difference it can make for your
              business.
            </p>
            <CallToActionClient />
          </div>
        </div>
      </section>
      <footer className='bg-white'>
        <div className='max-w-screen-xl p-4 py-6 mx-auto lg:py-16 md:p-8 lg:p-10'>
          <div className='text-center'>
            <a
              href='#'
              className='flex items-center justify-center mb-5 text-2xl font-semibold text-gray-900'
            >
              <img
                src='./images/icon.svg'
                className='object-fill h-20 sm:h-20 scale-150'
                alt='Fasty Logo'
              />
              Fasty
            </a>
            <span className='block text-sm text-center text-gray-500'>
              © 2023 Fasty. All Rights Reserved.
              <a href='https://storyset.com/work'>
                Work illustrations by Storyset
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
