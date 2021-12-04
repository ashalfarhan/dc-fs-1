const Card = ({ children, className, ...props }: JSX.IntrinsicElements['div']) => {
  return (
    <div
      className={
        'max-w-md p-8 min-w-[402px] flex flex-col justify-center space-y-4 shadow-2xl rounded-xl ' + String(className)
      }
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
