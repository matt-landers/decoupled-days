import { Header, Footer } from "components";
import Head from "next/head";
import React from "react";
import { client } from "client";

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
      <div className="wrap">
        <h1>Team</h1>
        <ul>
          {teamMembers.map((teamMember) => (
            <li>
              {teamMember.name}
              {teamMember.pic.mediaItemUrl}
            </li>
          ))}
        </ul>
      </div>

      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
};

export default Team;
