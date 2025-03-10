import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { Circle } from 'lucide-react';
import './PaymentTracking.css';

const PaymentTracking = () => {
  return (
    <div className="container">
      <div className="container1">
      {/* Tracking Number Header */}
      <div className="tracking-header">
        <span className="tracking-text">
          Tracking No: <span className="tracking-id">VA4GJ</span>
        </span>
      </div>

      {/* Timeline Panels */}
      <div className="timeline">
        {/* Panel 1 */}
        <div className="panel" >
          <Circle className="circle blue"/>
          <div>
            <p className="panel-text">Payment of PHP 2000.00 made by the buyer from their BANK ACCOUNT via PaxfulPay</p>
            <p className="panel-date">10 March 2025</p>
          </div>
        </div>

        {/* Panel 2 */}
        <div className="panel">
          <Circle className="circle yellow"/>
          <div>
            <p className="panel-text">Transaction processed successfully by PaxfulPay to be deposited in your BANK ACCOUNT TO CARMELITA GAMIT HERMINIGILDO,09658725504 account</p>
            <p className="panel-date">10 March 2025</p>
          </div>
        </div>

        {/* Panel 3 */}
        <div className="panel links" >
          <Circle className="circle blue"/>
          <div className="panel-content">
            <p className="panel-text">Accept payment via the open trade in the respective account.</p>
            <p className="panel-text">REQUIRED:</p>
            <p className="panel-text" >Link respective account to complete this step.</p>
            <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
              <Link to="/login" className="btn btn-accept">Accept Payment</Link>
              <Link to="/login" className="btn btn-cancel">Cancel The Transfer</Link>
            </div>
            <p className="panel-note">Once initiated, the transfer process can only be completed or cancelled by the seller.</p>
          </div>
        </div>

        {/* Panel 4 */}
        <div className="panel" >
          <Circle className="circle blue" />
          <div>
            <p className="panel-text">Funds received by the Seller</p>
            <p className="panel-date">Instantly</p>
          </div>
        </div>
      </div>

      {/* Customer Details Card */}
      <div className="customer-details">
        <div className="customer-header">
          <h2 className="customer-title">Customer Details</h2>
          <p><span className="customer-label">Transaction ID:</span> 393198</p>
          <p className="customer-label">Notes: Accept transfer for payment release.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentTracking;