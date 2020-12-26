import Nav from "../components/nav";
import { getWhyNextReasons } from "../lib/api";
import ContactForm from "../components/contactUsForm";
import Basic from "../components/formikForm3";

export default function IdPage({ reasons }) {
	const bgImage =
		"https://davidsonhomesllc.info/wp-content/uploads/2019/03/For-Web-RA_Savannah_C_3045_01-.jpg";
	return (
		<>
			<style jsx>{`
				.headerImage {
					background:
									/* top, transparent red, faked with gradient */ linear-gradient(
							#9bae88ee,
							#9bae88
						),
						/* bottom, image */ url(${bgImage});
					background-size: cover;
				}
			`}</style>
			<div className=" bg-primary headerImage min-h-screen">
				<div className="  container mx-auto py-8 px-4 md:px-8">
					<h1 className="text-3xl leading-tight md:text-4xl text-white font-bold text-center text-accent-1 mb-16">
						Welcome to {reasons.community}!
					</h1>

					<Basic id={reasons.id} community={reasons.community} />
				</div>
			</div>
		</>
	);
}

export async function getStaticPaths() {
	// Get the paths we want to pre-render based on posts
	const reasons = await getWhyNextReasons();
	const paths = reasons.map(({ slug, id, community }) => ({
		params: { lassoId: slug },
	}));

	// { fallback: false } means other routes should 404.
	return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
	console.log(params);
	const rawReasons = await getWhyNextReasons();
	const reasons = await rawReasons.filter((o) =>
		Object.values(o).includes(params.lassoId)
	)[0];

	return {
		props: {
			reasons,
		},
		// Next.js will attempt to re-generate the page:
		// - When a request comes in
		// - At most once every second
		//revalidate: 10, // In seconds
	};
}
