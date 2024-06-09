import Head from "next/head";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { FloatingGroupButton } from "@/src/component/floating-button-group";
import { SidebarNavigation } from "@/src/component/sidebar-navigation";

export default function App({ Component, pageProps }: AppProps) {
 
	return (
		<>
			<Head>
				<title>QuickAppsDemo</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main >
				<SidebarNavigation>
					<Component {...pageProps} />
					<FloatingGroupButton/>
				</SidebarNavigation>
			</main>
		</>
	)
}
