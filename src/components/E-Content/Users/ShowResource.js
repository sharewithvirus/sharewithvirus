import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { requestURL } from "../../ReqUrl";
const ShowResource = ({ showResource, setShowResource, data }) => {
  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  console.log("THis is the resources data :", data);
  return (
    <Dialog open={showResource}>
      <DialogTitle>
        <div className="row">
          <div className="col-6">{data.name}</div>
          <div className="col-6 d-flex justify-content-end">
            <img
              src="/images/close-icon.svg"
              alt="user"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Close"
              onClick={() => setShowResource(false)}
              style={{ width: "1.5rem", cursor: "pointer" }}
            />
          </div>
        </div>
      </DialogTitle>
      <DialogContent>
        <div className="row">
          {data.resourceKeys.map((reso, index) => (
            <div
              className="d-flex justify-content-start"
              onClick={() =>
                openInNewTab(`${requestURL}/resource/${reso.resourceKey}`)
              }
              key={index}
            >
              <h4>{index + 1} - </h4>
              <p
                className="mx-4"
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  textDecorationColor: "blue",
                }}
              >
                {reso.resourceName}
              </p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShowResource;
