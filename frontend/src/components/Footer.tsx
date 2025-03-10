const Footer = () => {

    const currentYear: number = new Date().getFullYear()
    
  return (
    <footer>Mow Eventz &copy; {currentYear} </footer>
  )
}

export default Footer