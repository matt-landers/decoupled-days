import { Header, Footer } from "components";
import Head from "next/head";
import React from "react";
import { client } from "client";
import styles from "scss/pages/team.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

const Team = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const query = client.useQuery();
  const generalSettings = query.generalSettings;
  const teamMember = query.teamMemberBy({ id });

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
      <div className={`wrap ${styles.team}`}>
        <h1>{teamMember.name}</h1>
        <img src={teamMember.pic.mediaItemUrl} alt={teamMember.name} />
        <div dangerouslySetInnerHTML={{ __html: teamMember.bio }} />
      </div>

      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
};

export default Team;
