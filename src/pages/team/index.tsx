import { Header, Footer } from "components";
import Head from "next/head";
import React from "react";
import { client } from "client";

import styles from "scss/pages/team.module.scss";
import Link from "next/link";

const Team = () => {
  const query = client.useQuery();
  const generalSettings = query.generalSettings;
  const teamMembers = query.teamMembers().nodes;

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
        <h1>Team</h1>
        <ul>
          {teamMembers.map((teamMember) => (
            <li key={teamMember.id}>
              <Link href={`/team/${teamMember.id}`}>
                <a href={`/team/${teamMember.id}`}>
                  <img
                    src={teamMember.pic.mediaItemUrl}
                    alt={teamMember.name}
                  />
                  <h2>{teamMember.name}</h2>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
};

export default Team;
