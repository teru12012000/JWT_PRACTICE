import { IconButton } from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const Back = () => {
  return (
    <div className="m-5 text-start">
      <Link href="/">
        <IconButton color="primary" aria-label="upload picture" component="label">
          <ArrowBackIcon />
        </IconButton>
      </Link>
    </div>
  );
}

export default Back;