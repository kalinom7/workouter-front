type HeaderProps = {
  readonly user: string
}

function Header( { user }: HeaderProps ) {
  return (
    <header>
      <h1> Welcome, {user}!</h1>
    </header>
  )
}

export default Header