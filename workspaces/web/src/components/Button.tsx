const Button = ({ children, className, ...props }: JSX.IntrinsicElements['button']) => {
  return (
    <button className={'bg-blue-500 rounded-md py-2 px-4 text-white font-noto ' + className} {...props}>
      {children}
    </button>
  )
}

export default Button
