import SigninForm from '@/components/SigninForm'
import SignupForm from '@/components/SignupForm'
import { useNavigate, useParams } from 'react-router-dom'

const actionState = {
  signin: 'signin',
  signup: 'signup',
}

const AuthUser = () => {
  const { sign } = useParams()

  const history = useNavigate()
  const toHomePage = () => {
    history('/')
  }

  const switchAuthState = state => setAction(state)

  return (
    <div className="bottom-0 left-0 right-0 top-0 w-full overflow-hidden ">
      <header className="flex h-[85px] items-center justify-center bg-white px-24 py-3 sm:justify-between">
        <div className="flex ">
          <button onClick={toHomePage} className=" inline-block max-w-[200px]">
            <div
              className="h-[50px] w-[150px] bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${
                  new URL(
                    `@/assets/img/logos/logo_header_2.svg`,
                    import.meta.url
                  ).href
                })`,
              }}
            ></div>
          </button>
        </div>

        <div className="help hidden cursor-pointer text-base text-primary underline sm:block">
          Bạn cần giúp đỡ ?
        </div>
      </header>

      <main className="relative h-[600px] w-full bg-primary bg-contain bg-center bg-no-repeat ">
        <div className="flex ">
          <div className="absolute left-[10%] top-0 hidden auth:block">
            <div
              className="h-[600px] w-[600px] bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${
                  new URL(`../assets/img/logos/girl.svg`, import.meta.url).href
                })`,
              }}
            ></div>
          </div>
        </div>
        <div className="mt-[8%] block h-[492px] w-full  rounded-md bg-white px-12 py-6 sm:mx-auto sm:w-[400px] auth:absolute auth:right-[10%] auth:top-[50%] auth:mx-0 auth:mt-0 auth:translate-y-[-50%] ">
          {sign === actionState.signin && (
            <SigninForm
              switchAuthState={() => switchAuthState(actionState.signup)}
            />
          )}

          {sign === actionState.signup && (
            <SignupForm
              switchAuthState={() => switchAuthState(actionState.signin)}
            />
          )}
        </div>
      </main>
    </div>
  )
}

export default AuthUser
