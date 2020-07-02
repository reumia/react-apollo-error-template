import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const ALL_PEOPLE = gql`
  query AllPeople {
    people {
      name
    }
  }
`;

const ALL_GENDER = gql`
  query AllGender {
    people {
      gender
    }
  }
`;

function ChildList() {
  const { loading, data } = useQuery(ALL_GENDER);
  return (
    <section>
      <h2>List of Nerds</h2>
      {loading || !data ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.people.map(({ gender }, index) => (
            <li key={index}>{gender}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default function App() {
  const { loading, data } = useQuery(ALL_PEOPLE);
  return (
    <main>
      <h1>Apollo Client Issue Reproduction</h1>
      <p>
        This application can be used to demonstrate an error in Apollo Client.
      </p>
      <h2>Names</h2>
      {loading || !data ? (
        <p>Loading…</p>
      ) : (
        <ul>
          {data.people.map((person) => (
            <li key={person.name}>{person.name}</li>
          ))}
        </ul>
      )}
      <ChildList />
    </main>
  );
}
