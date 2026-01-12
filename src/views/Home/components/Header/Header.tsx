type HeaderProps = {
  readonly user: string
}

export const Header = ({ user }: HeaderProps ) => {
  return (
    <header>
      <h1> Welcome, {user}!</h1>
    </header>
  )
} 