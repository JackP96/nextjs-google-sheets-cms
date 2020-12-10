import Nav from "../components/nav";
import { getWhyNextReasons } from "../lib/api";

export default function IdPage({ reasons }) {
	return (
		<div>
			<div className=" bg-primary container mx-auto py-20 px-8">
				<h1 className="text-5xl text-center text-accent-1 mb-16">
					Welcome to {reasons.community}
				</h1>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					<a
						className="border border-grey-200 rounded p-4 hover:shadow-lg hover:border-transparent"
						key={reasons.id}
						href={"/" + reasons.id}
						target="_blank"
					>
						<h3 className="font-bold mb-2">{reasons.community}</h3>
						<div dangerouslySetInnerHTML={{ __html: reasons.description }} />
						<span className="text-blue-600 hover:text-blue-400 hover:underline mt-4 block">
							Documentation →
						</span>
					</a>
				</div>
			</div>
		</div>
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
	const reasons = rawReasons.filter((o) =>
		Object.values(o).includes(params.lassoId)
	)[0];

	return {
		props: {
			reasons,
		},
		// Next.js will attempt to re-generate the page:
		// - When a request comes in
		// - At most once every second
		revalidate: 1, // In seconds
	};
}

/*export async function getStaticProps({ params }) {
	//console.log("Static Props");
	console.log(params.state.replace("-", " "));
	const adjState = await params.state.replace("-", " ");
	console.log();
	// Pass post data to the page via props

	const stateDetails = stateData.states.filter((o) =>
		Object.values(o).includes(adjState)
	)[0];

	console.log(stateDetails);
	const data = await require("communitiesCombined.json");
	const adjData = data.communities.filter((o) =>
		stateDetails.Communities.includes(o.SubdivisionName)
	);

	return { props: { stateDetails, data, adjData } };
}*/
