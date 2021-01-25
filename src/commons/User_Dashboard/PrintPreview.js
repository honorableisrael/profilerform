import React from "react";
import "./user_dashboard.scss";

const PreviewPage = () => {
  return (
    <>
      <div className="printwrapp">
        <div className="pagetitlepr">
          Affordability Test - Finance Plus | Real Estate, Apartments, Mortgages
          & Home Values
        </div>
        <div className="textlf"><span onClick={()=>window.print()}>Print Page</span></div>
        <div className="personalinfo">
          <div className="personlatitle">PERSONAL INFORMATION</div>
          <div className="frntrow">
            <div className="nnxg">
              <div className="printtitle">Title</div>
              <div className="printbody">Mr</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">FIRST NAME</div>
              <div className="printbody">JOHN</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">LAST NAME</div>
              <div className="printbody">JOHN</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">MIDDLE NAME</div>
              <div className="printbody">JOHN</div>
            </div>
          </div>
          <div className="frntrow">
            <div className="nnxg">
              <div className="printtitle">Email</div>
              <div className="printbody">mo@gmail.com</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">Phone Number</div>
              <div className="printbody">09167121341</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">DATE OF BIRTH</div>
              <div className="printbody">12/3/1944</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">Sex</div>
              <div className="printbody">MALE</div>
            </div>
          </div>
          <div className="frntrow">
            <div className="nnxg">
              <div className="printtitle">Address</div>
              <div className="printbody">Plot 3, Niger road</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">State of origin</div>
              <div className="printbody">Niger</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">Highest education</div>
              <div className="printbody">Harum voluptate dolo</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">DATE OF BIRTH</div>
              <div className="printbody">12/3/1944</div>
            </div>
          </div>
          <div className="divvder"></div>
          <div className="personlatitle">OTHER PERSONAL INFORMATION</div>
          <div className="frntrow">
            <div className="nnxg">
              <div className="printtitle">CURRENT HOME TYPE</div>
              <div className="printbody">JOHN</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">OTHERS</div>
              <div className="printbody">JOHN</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">ANNUAL RENT</div>
              <div className="printbody">JOHN</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">MARITAL STATUS</div>
              <div className="printbody">Single</div>
            </div>
          </div>
          <div className="frntrow">
            <div className="nnxg">
              <div className="printtitle">SPOUSE’S NAME</div>
              <div className="printbody">N/A</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">SPOUSE’S ADDRESS</div>
              <div className="printbody">N/A</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">SPOUSE’S EMPLOYER</div>
              <div className="printbody">N/A</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">YEARS EMPLOYED</div>
              <div className="printbody">12</div>
            </div>
          </div>
          <div className="frntrow">
            <div className="nnxg">
              <div className="printtitle">NEXT-OF-KIN’S NAME</div>
              <div className="printbody">N/A</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">NEXT-OF-KIN’S RELATIONSHIP</div>
              <div className="printbody">N/A</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">NEXT-OF-KIN’S RELATIONSHIP</div>
              <div className="printbody">N/A</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">YEARS EMPLOYED</div>
              <div className="printbody">12</div>
            </div>
          </div>
          <div className="frntrow">
            <div className="nnxg">
              <div className="printtitle">PROFESSION OF SPOUSE</div>
              <div className="printbody">N/A</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">SPOUSE'S ANNUAL INCOME</div>
              <div className="printbody">N/A</div>
            </div>
            <div className="nnxg">
            </div>
            <div className="nnxg">

            </div>
          </div>
          <div className="printtitle printood">CHILDREN/OTHER DEPENDENTS</div>
          <div className="frntrowtable">
            <div className="nnxg">
              <div className="printtitle">Name</div>
              <div className="printbody">N/A</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">Age</div>
              <div className="printbody">N/A</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">Relationship</div>
              <div className="printbody">N/A</div>
            </div>
          </div>
          <div className="divvder"></div>
          <div className="personlatitle">EMPLOYMENT INFORMATION</div>
          <div className="frntrow">
            <div className="nnxg">
              <div className="printtitle">COMPANY NAME</div>
              <div className="printbody">Porro doloremque odi</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">COMPANY EMAIL ADDRESS</div>
              <div className="printbody">israel@yahoo.com</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">EMPLOYER PHONE NO</div>
              <div className="printbody">08012345678</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">ADDRESS OF EMPLOYER</div>
              <div className="printbody">Laudanum ex labor</div>
            </div>
          </div>
          <div className="printtitle printood">OTHER EMPLOYMENTS:</div>
          <div className="frntrowtable">
            <div className="nnxg">
              <div className="printtitle">COMPANY NAME</div>
              <div className="printbody">N/A</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">COMPANY PHONE</div>
              <div className="printbody">N/A</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">COMPANY ADDRESS</div>
              <div className="printbody">N/A</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">YEARS</div>
              <div className="printbody">N/A</div>
            </div>
          </div>
          <div className="divvder"></div>
          <div className="personlatitle">FINANCIAL INFORMATION</div>
          <div className="frntrow">
            <div className="nnxg">
              <div className="printtitle">TOTAL ANNUAL PAY</div>
              <div className="printbody">N300,000</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">MONTHLY GROSS PAY</div>
              <div className="printbody">N20,000,000</div>
            </div>
            <div className="nnxg">
              <div className="printtitle"> MONTHLY NET PAY</div>
              <div className="printbody">1,000,000</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">MONTHLY EXPENSES</div>
              <div className="printbody">200,000</div>
            </div>
          </div>
          <div className="printtitle printood">OTHER SOURCE(S) OF INCOME</div>
          <div className="frntrowtable">
            <div className="nnxg">
              <div className="printtitle">SOURCE</div>
              <div className="printbody">N/A</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">SOURCE AMOUNT/YEAR (N)</div>
              <div className="printbody">N/A</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">COMPANY ADDRESS</div>
              <div className="printbody">N/A</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">YEARS</div>
              <div className="printbody">N/A</div>
            </div>
          </div>
          <div className="divvder"></div>
          <div className="personlatitle">LOAN INFORMATION</div>
          <div className="frntrow">
            <div className="nnxg">
              <div className="printtitle">PROPOSED EQUITY CONTRIBUTION</div>
              <div className="printbody">N5,750,000</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">LOAN AMOUNT</div>
              <div className="printbody">₦ 4,603,117.24</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">PROPERTY VALUE</div>
              <div className="printbody">N1,000,000</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">PROPERTY ADDRESS</div>
              <div className="printbody">Culpa dolor sed rem</div>
            </div>
          </div>
          <div className="frntrow">
            <div className="nnxg">
              <div className="printtitle">PROPERTY TITLE</div>
              <div className="printbody">Culpa dolor sed rem</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviewPage;
