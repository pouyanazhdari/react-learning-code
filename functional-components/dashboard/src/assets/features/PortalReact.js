import React from "react";
import ReactDOM, { createPortal } from "react-dom";

const PortalReact = () => {
  return createPortal(
    <div
      className="modal d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">عنوان مدال</h5>
            <button className="btn-close"></button>
          </div>
          <div className="modal-body">
            <p>این محتوای مدال است</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary">بستن</button>
            <button className="btn btn-primary">ذخیره</button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("portal-root")
  );
};

export default PortalReact;
 