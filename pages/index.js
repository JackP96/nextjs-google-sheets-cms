import Nav from "../components/nav";
import Link from "next/link";
import { getWhyNextReasons } from "../lib/api";

export default function IndexPage({ reasons }) {
	return (
		<div>
			<div className="container mx-auto py-20 px-8">
				<h1 className="text-5xl text-center text-accent-1 mb-16">
					iPad Form Links
				</h1>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{reasons.map(({ description, slug, id, community }) => (
						<>
							<Link href={slug}>
								<a
									className="border border-grey-200 rounded p-4 hover:shadow-lg hover:border-transparent"
									key={community}
								>
									<h3 className="font-bold mb-2">{community}</h3>
									<div dangerouslySetInnerHTML={{ __html: slug }} />
								</a>
							</Link>
						</>
					))}
				</div>
			</div>
		</div>
	);
}

export async function getStaticProps(context) {
	const reasons = await getWhyNextReasons();

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
