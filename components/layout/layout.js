import Navbar from './navbar'

function Layout(props) {
	return (
		<>
			<Navbar />
			<main>{props.children}</main>
		</>
	)
}

export default Layout
