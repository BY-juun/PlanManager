import React from "react";
import { Header } from "./styles";
import Link from "next/link";

export default function ButtonAppBar() {
  return (
    <Header>
      <Link href="/">
        <div>RecordMyDay</div>
      </Link>
    </Header>
  );
}
