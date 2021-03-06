import * as React from "react";

interface Props {
  dockerVersion: string | undefined;
}

export const Status = ({ dockerVersion }: Props) => (
  <li className="status">
    {dockerVersion === undefined
      ? "Looking for Docker"
      : dockerVersion === ""
      ? "Docker not available"
      : `Using Docker ${dockerVersion}`}
  </li>
);
