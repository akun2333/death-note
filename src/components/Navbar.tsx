import { NavBar } from 'antd-mobile'
import { LeftOutline } from 'antd-mobile-icons'
import router from 'next/router'

export const Navbar = ({
  title = 'title',
  border = true,
  backArrow = false,
  sticky = false,
  right = <></>,
  handlerBack = async () => {
    await router.replace('/')
    router.reload()
  }
}) => {
  return (
    <>
      <NavBar
        className={`w-full bg-white ${
          border && '!border-b-1 !border-b-gray-50 !border-solid'
        } ${sticky && 'fixed top-0 z-10'}`}
        style={{
          minHeight: 'var(--height)'
        }}
        backArrow={backArrow && <LeftOutline className="flex" fontSize={13} />}
        right={right}
        onBack={handlerBack}
      >
        <div className="!text-base !font-bold">{title}</div>
      </NavBar>
      {sticky && <NavBar />}
    </>
  )
}
