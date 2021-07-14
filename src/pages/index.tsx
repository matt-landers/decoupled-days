import { getNextStaticProps } from "@faustjs/next";

import { GetStaticPropsContext } from "next";
import Head from "next/head";
import React from "react";
import { CTA, Footer, Header, Hero, Posts } from "components";
import styles from "scss/pages/home.module.scss";
import { client } from "client";

export default function Page() {
  const { usePosts, useQuery } = client;
  const generalSettings = useQuery().generalSettings;
  const posts = usePosts({
    first: 6,
    where: {
      categoryName: "uncategorized",
    },
  });

  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />

      <Head>
        <title>
          {generalSettings.title} - {generalSettings.description}
        </title>
      </Head>

      <main className="content">
        <Hero
          title="Get Started with Headless"
          buttonText="Developer Docs"
          buttonURL="https://developers.wpengine.com/"
          button2Text="Headless on GitHub"
          button2URL="https://github.com/wpengine/headless-framework"
          bgImage="/images/headless_hero_background.jpg"
          id={styles.home_hero}
        >
          <p>
            WP&nbsp;Engine’s Headless WordPress Framework includes this example
            project, the{" "}
            <a href="https://github.com/wpengine/headless-framework#plugin-features">
              headless WordPress plugin
            </a>
            ,{" "}
            <a href="https://github.com/wpengine/headless-framework">
              headless packages
            </a>
            , and <a href="https://developers.wpengine.com/">tutorials</a> to
            make building headless WordPress sites fast and fun.
          </p>
        </Hero>
        <Posts
          posts={posts.nodes}
          heading="Latest Posts"
          intro="The Posts component in src/pages/index.tsx shows the latest six posts from the connected WordPress site."
          headingLevel="h2"
          postTitleLevel="h3"
          id={styles.post_list}
        />
        <CTA
          title="Questions or comments?"
          buttonText="Join the discussion on GitHub"
          buttonURL="https://github.com/wpengine/headless-framework/discussions"
          headingLevel="h2"
        >
          <p>
            We welcome feature requests, bug reports and questions in the{" "}
            <a href="https://github.com/wpengine/headless-framework">
              Headless Framework GitHub repository
            </a>
            .
          </p>
        </CTA>
      </main>
      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
    client,
  });
}
