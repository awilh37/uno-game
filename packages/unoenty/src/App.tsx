import React, { ReactElement } from "react"
import { Grid, makeStyles } from "@material-ui/core"

import { Disconnected, Menu } from "@/components"
import Routes from "@/routes"

import SocketProvider from "@/store/Socket"

import colors from "@/styles/colors"

const useStyles = makeStyles(theme => ({
	routesContainer: {
		flex: 1,
		width: "100%",
		height: "100%",
		borderTopLeftRadius: theme.spacing(5),
		borderBottomLeftRadius: theme.spacing(5),
		backgroundColor: colors.palette.blue1,
	},
	appContainer: {
		overflowX: "hidden",
		backgroundColor: colors.grayScale[1],
	},
}))

const App = (): ReactElement => {
	const classes = useStyles()

	return (
		<SocketProvider>
			<Grid
				container
				className={classes.appContainer}
			>
				<Menu />

				<Grid
					container
					className={classes.routesContainer}
				>
					<Grid item sm={12} md={12} lg={12} xl={12}>
						<Routes />
					</Grid>
				</Grid>

				<Disconnected />
			</Grid>
		</SocketProvider>
	)
}

export default App
