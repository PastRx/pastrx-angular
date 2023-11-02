import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { DatePipe } from '@angular/common';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResourceComponent } from 'src/app/resource/resource.component';

declare var PASTRX: any;
declare var gapi: any;
interface specialties {
  Value: string;
  Display: string;
}
@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent {
  emailPattern = "[-a-zA-Z0-9~!$%^&amp;*_=+}{'?]+(\.[-a-zA-Z0-9~!$%^&amp;*_=+}{'?]+)*@([a-zA-Z0-9_][-a-zA-Z0-9_]*(\.[-a-zA-Z0-9_]+)*\.([cC][oO][mM]))(:[0-9]{1,5})?";
  resgetPrimarySpeciality: null;

  isNoPMPReports = false;
  selpsp: any;
  request = {
    loginAllowed: false,
    active: false,
    practiceAdmin: false,
    firstName: '',
    lastName: '',
    email: '',
    prescriberNPI: '',
    prescriberDEANumber: '',
    prescriberStateId: '',
    prescriberNCPDP: '',
    newEHRID: '',
    newEHRIDType: '',
    baselineRequests: 0,
    serviceDayPerWeek: 0,
    specialty: ''
  };

  hint = "As you move through the form to the left, this panel will display details about the current field.";
  InfoPanel = "Info Panel";

  constructor(private api: ApiService, private datePipe: DatePipe, private router: Router, public dialog: MatDialog) { }
  ngOnInit() {
    this.api.getUserData(
      {
        'masquerade': PASTRX.masquerade
      }
    ).subscribe({
      next: (res) => {
        console.log('getUserData------------>' + res)
        this.request = res;
        this.getEhrIds(res.id);
        if (this.request.specialty == undefined) {
          this.request.specialty = 'novalue';
          this.selpsp = "";
        } else {
          this.selpsp = this.request.specialty;
        }
      },
      error: (e) => console.log(e),
    });
  }

  openDialogUpdateUser(): void {
    const dialogRef = this.dialog.open(ResourceComponent, {
      width: '100%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }




  closeDialogUpdateUser() {
    // this.dialogRef.close('Play Youtube Video Closed');
  }

  hintLastName() {
    this.InfoPanel = "Last Name";
    this.hint = "Last Name of the Provider.";
  }

  hintFirstName() {
    this.InfoPanel = "First Name";
    this.hint = "First Name of the Provider.";
  }

  hintEmail() {
    this.InfoPanel = "Email";
    this.hint = "Email of the Provider. This must be the Google ID the provider will use to login.";
  }

  hintPrimarySpecialty() {
    this.InfoPanel = "Primary Specialty";
    this.hint = 'Taxonomy code for primary specialty.<br>Pmp Gateway Accepted specialties.<br>103T*<br>152W*<br>207*<br>208*<br>213E*<br>363A*<br>363L*<br>1223*<br>1835*<br>3336*<br>175F00000X<br>1835P0018X<br>174M00000X<br>183700000X<br>183500000X';
  }

  hintNCPDPID() {
    this.InfoPanel = "NCPDP ID";
    this.hint = "NCPDP ID.";
  }

  hintStateID() {
    this.InfoPanel = "Prescriber State ID";
    this.hint = "State ID of the prescriber.";
  }

  hintPrescriberDEA() {
    this.InfoPanel = "Prescriber DEA";
    this.hint = "DEA Number for the prescriber.";
  }

  hintNPINumber() {
    this.InfoPanel = "NPI Number";
    this.hint = "NPI Number of the Provider.";
  }

  updateFields() { }

  getEhrIds(userId) {
    this.api.getEHRIDsForUser({
      userId: userId
    }).subscribe({
      next: (resp) => {
        if (resp != null && resp.items != undefined) {
          var tmp = this.request;
          tmp.newEHRID = resp.items;
          this.request = null;
          this.request = tmp;
        }
      },
      error: (e) => console.log(e),
    });

  }

  PrimarySpeciality: specialties[] = [
    { 'Value': 'novalue', 'Display': 'None Selected' },
    { 'Value': '208D00000X', 'Display': 'General Practice' },
    { 'Value': '208600000X', 'Display': 'Surgery' },
    { 'Value': '2086H0002X', 'Display': 'Hospice and Palliative Medicine' },
    { 'Value': '2086S0120X', 'Display': 'Pediatric Surgery' },
    { 'Value': '2086S0122X', 'Display': 'Plastic and Reconstructive Surgery' },
    { 'Value': '2086S0105X', 'Display': 'Surgery of the Hand' },
    { 'Value': '2086S0102X', 'Display': 'Surgical Critical Care' },
    { 'Value': '2086X0206X', 'Display': 'Surgical Oncology' },
    { 'Value': '2086S0127X', 'Display': 'Trauma Surgery' },
    { 'Value': '2086S0129X', 'Display': 'Vascular Surgery' },
    { 'Value': '208G00000X', 'Display': 'Thoracic Surgery (Cardiothoracic Vascular Surgery)' },
    { 'Value': '204F00000X', 'Display': 'Transplant Surgery' },
    { 'Value': '208C00000X', 'Display': 'Colon & Rectal Surgery' },
    { 'Value': '207T00000X', 'Display': 'Neurological Surgery' },
    { 'Value': '204E00000X', 'Display': 'Oral & Maxillofacial Surgery' },
    { 'Value': '207X00000X', 'Display': 'Orthopaedic Surgery' },
    { 'Value': '207XS0114X', 'Display': 'Orthopaedic Adult Reconstructive Orthopaedic Surgery' },
    { 'Value': '207XX0004X', 'Display': 'Orthopaedic Foot and Ankle Surgery' },
    { 'Value': '207XS0106X', 'Display': 'Orthopaedic Hand Surgery' },
    { 'Value': '207XS0117X', 'Display': 'Orthopaedic Orthopaedic Surgery of the Spine' },
    { 'Value': '207XX0801X', 'Display': 'Orthopaedic Orthopaedic Trauma' },
    { 'Value': '207XP3100X', 'Display': 'Orthopaedic Pediatric Orthopaedic Surgery' },
    { 'Value': '207XX0005X', 'Display': 'Orthopaedic Sports Medicine' },
    { 'Value': '208200000X', 'Display': 'Plastic Surgery' },
    { 'Value': '2082S0099X', 'Display': 'Plastic Plastic Surgery Within the Head & Neck' },
    { 'Value': '2082S0105X', 'Display': 'Plastic Surgery of the Hand' },
    { 'Value': '207K00000X', 'Display': 'Allergy and Immunology' },
    { 'Value': '207KA0200X', 'Display': 'Allergy and Immunology/Allergy' },
    { 'Value': '207KI0005X', 'Display': 'Clinical & Laboratory Immunology' },
    { 'Value': '207Y00000X', 'Display': 'Otolaryngology' },
    { 'Value': '207YS0123X', 'Display': 'Facial Plastic Surgery' },
    { 'Value': '207YX0602X', 'Display': 'Otolaryngic Allergy' },
    { 'Value': '207YX0905X', 'Display': 'Otolaryngology/Facial Plastic Surgery' },
    { 'Value': '207YX0901X', 'Display': 'Otology &Neurotology' },
    { 'Value': '207YP0228X', 'Display': 'Pediatric Otolaryngology' },
    { 'Value': '207YX0007X', 'Display': 'Plastic Surgery within the Head & Neck' },
    { 'Value': '207YS0012X', 'Display': 'Sleep Medicine' },
    { 'Value': '207L00000X', 'Display': 'Anesthesiology' },
    { 'Value': '207LA0401X', 'Display': 'Anesthesiology/Addiction Medicine' },
    { 'Value': '207LC0200X', 'Display': 'Anesthesiology/Critical Care Medicine' },
    { 'Value': '207LH0002X', 'Display': 'Anesthesiology/Hospice and Palliative Medicine' },
    { 'Value': '207LP2900X', 'Display': 'Anesthesiology/Pain Medicine' },
    { 'Value': '207LP3000X', 'Display': 'Anesthesiology/Pediatric Anesthesiology' },
    { 'Value': '207RC0000X', 'Display': 'Internal Medicine, Cardiovascular Disease' },
    { 'Value': '207N00000X', 'Display': 'Dermatology' },
    { 'Value': '207NI0002X', 'Display': 'Dermatology, Clinical & Laboratory Dermatological Immunology' },
    { 'Value': '207ND0101X', 'Display': 'Dermatology, MOHS-Micrographic Surgery' },
    { 'Value': '207ND0900X', 'Display': 'Dermatology, Dermapathology' },
    { 'Value': '207NP0225X', 'Display': 'Dermatology, Pediatric Dermatology' },
    { 'Value': '207NS0135X', 'Display': 'Allopathic &Osteopathic Physicians/Dermatology, Procedural Dermatology' },
    { 'Value': '207Q00000X', 'Display': 'Family Medicine' },
    { 'Value': '207QA0401X', 'Display': 'Family Medicine, Addiction Medicine' },
    { 'Value': '207QA0000X', 'Display': 'Family Medicine, Adolescent Medicine' },
    { 'Value': '207QA0505X', 'Display': 'Family Medicine, Adult Medicine' },
    { 'Value': '207QB0002X', 'Display': 'Family Medicine, Bariatric Medicine' },
    { 'Value': '207QG0300X', 'Display': 'Family Medicine, Geriatric Medicine' },
    { 'Value': '207QH0002X', 'Display': 'Family Medicine, Hospice and Palliative Medicine' },
    { 'Value': '207QS0010X', 'Display': 'Family Medicine, Sports Medicine' },
    { 'Value': '207QS1201X', 'Display': 'Family Medicine, Sleep Medicine' },
    { 'Value': '208VP0014X', 'Display': 'Pain Medicine, Interventional Pain Medicine' },
    { 'Value': '207RG0100X', 'Display': 'Internal Medicine, Gastroenterology' },
    { 'Value': '207R00000X', 'Display': 'Internal Medicine' },
    { 'Value': '207RA0401X', 'Display': 'Internal Medicine, Addiction Medicine' },
    { 'Value': '207RA0000X', 'Display': 'Internal Medicine, Adolescent Medicine' },
    { 'Value': '207RA0201X', 'Display': 'Internal Medicine, Allergy & Immunology' },
    { 'Value': '207RB0002X', 'Display': 'Internal Medicine, Bariatric Medicine' },
    { 'Value': '207RI0001X', 'Display': 'Internal Medicine, Clinical & Laboratory Immunology' },
    { 'Value': '207RC0001X', 'Display': 'Internal Medicine, Clinical Cardiatric Electrophysiology' },
    { 'Value': '207RC0200X', 'Display': 'Internal Medicine, Critical Care Medicine' },
    { 'Value': '207RE0101X', 'Display': 'Internal Medicine, Endocrinology, Diabetes, & Metabolism' },
    { 'Value': '207RG0300X', 'Display': 'Internal Medicine, Geriatric Medicine' },
    { 'Value': '207RH0000X', 'Display': 'Internal Medicine, Hematology' },
    { 'Value': '207RH0003X', 'Display': 'Internal Medicine, Hematology & Oncology' },
    { 'Value': '207RI0008X', 'Display': 'Internal Medicine, Hepatology' },
    { 'Value': '207RH0002X', 'Display': 'Internal Medicine, Hospice and Palliative Medicine' },
    { 'Value': '207RI0200X', 'Display': 'Internal Medicine, Infectious Disease' },
    { 'Value': '207RM1200X', 'Display': 'Internal Medicine, Magnetic Resonance Imaging (MRI)' },
    { 'Value': '207RX0202X', 'Display': 'Internal Medicine, Medical Oncology' },
    { 'Value': '207RN0300X', 'Display': 'Internal Medicine, Nephrology' },
    { 'Value': '207RP1001X', 'Display': 'Internal Medicine, Pulmonary Disease' },
    { 'Value': '207RR0500X', 'Display': 'Internal Medicine, Rheumatology' },
    { 'Value': '207RS0012X', 'Display': 'Internal Medicine, Sleep Medicine' },
    { 'Value': '207RS0010X', 'Display': 'Internal Medicine, Sports Medicine' },
    { 'Value': '207RT0003X', 'Display': 'Internal Medicine, Transplant Hepatology' },
    { 'Value': '204D00000X', 'Display': 'Neuromusculoskeletal Medicine & OMM' },
    { 'Value': '204C00000X', 'Display': 'Neuromusculoskeletal Medicine, Sports Medicine' },
    { 'Value': '2084N0400X', 'Display': 'Psychiatry and Neurology, Neurology' },
    { 'Value': '2084N0402X', 'Display': 'Psychiatry and Neurology, Neurology with Special Qualifications in Child Neurology' },
    { 'Value': '235Z00000X', 'Display': 'Speech, Language and Hearing Service Providers' },
    { 'Value': '207V00000X', 'Display': 'Obstetrics & Gynecology' },
    { 'Value': '207VB0002X', 'Display': 'Obstetrics & Gynecology, Bariatric Medicine' },
    { 'Value': '207VC0200X', 'Display': 'Obstetrics & Gynecology, Critical Care Medicine' },
    { 'Value': '207VF0040X', 'Display': 'Obstetrics & Gynecology, Female Pelvic Medicine and Reconstructive Surgery' },
    { 'Value': '207VX0201X', 'Display': 'Obstetrics & Gynecology, Gynecologic Oncology' },
    { 'Value': '207VG0400X', 'Display': 'Obstetrics & Gynecology, Gynecology' },
    { 'Value': '207VH0002X', 'Display': 'Obstetrics & Gynecology, Hospice and Palliative Medicine' },
    { 'Value': '207VM0101X', 'Display': 'Obstetrics & Gynecology, Maternal & Fetal Medicine' },
    { 'Value': '207VX0000X', 'Display': 'Obstetrics & Gynecology, Obstetrics' },
    { 'Value': '207VE0102X', 'Display': 'Obstetrics & Gynecology, Reproductive Endocrinology' },
    { 'Value': '2084H0002X', 'Display': 'Hospice and Palliative Medicine, Neuropsychiatry' },
    { 'Value': '207PH0002X', 'Display': 'Hospice and Palliative Medicine, Emergency Medicine' },
    { 'Value': '207W00000X', 'Display': 'Ophthalmology' },
    { 'Value': '1223S0112X', 'Display': 'Dental Providers/Dentist, Oral & Maxillofacial Surgery' },
    { 'Value': '207ZP0101X', 'Display': 'Pathology, Anatomic Pathology' },
    { 'Value': '207ZP0102X', 'Display': 'Pathology, Anatomic Pathology & Clinical Pathology' },
    { 'Value': '207ZB0001X', 'Display': 'Pathology, Blood Banking & Transfusion Medicine' },
    { 'Value': '207ZP0104X', 'Display': 'Pathology, Chemical Pathology' },
    { 'Value': '207ZC0006X', 'Display': 'Pathology, Clinical Pathology' },
    { 'Value': '207ZP0105X', 'Display': 'Pathology, Clinical Pathology/Laboratory Medicine' },
    { 'Value': '207ZC0500X', 'Display': 'Pathology, Cytopathology' },
    { 'Value': '207ZD0900X', 'Display': 'Pathology, Dermapathology' },
    { 'Value': '207ZF0201X', 'Display': 'Pathology, Forensic Pathology' },
    { 'Value': '207ZH0000X', 'Display': 'Pathology, Hematology' },
    { 'Value': '207ZI0100X', 'Display': 'Pathology, Immunopathology' },
    { 'Value': '207ZM0300X', 'Display': 'Pathology, Medical Microbiology' },
    { 'Value': '207ZP0007X', 'Display': 'Pathology, Molecular Genetic Pathology' },
    { 'Value': '207ZN0500X', 'Display': 'Pathology, Neuropathology' },
    { 'Value': '207ZP0213X', 'Display': 'Pathology, Pediatric Pathology' },
    { 'Value': '207PS0010X', 'Display': 'Emergency Medicine, Sports Medicine' },
    { 'Value': '2080S0010X', 'Display': 'Pediatrics, Sports Medicine' },
    { 'Value': '2081S0010X', 'Display': 'Physical Medicine & Rehabilitation, Sports Medicine' },
    { 'Value': '2083S0010X', 'Display': 'Preventive Medicine, Sports Medicine' },
    { 'Value': '2084S0010X', 'Display': 'Psychiatry & Neurology, Sports Medicine' },
    { 'Value': '208100000X', 'Display': 'Physical Medicine & Rehabilitation' },
    { 'Value': '2081H0002X', 'Display': 'Physical Medicine & Rehabilitation, Hospice and Palliative Medicine' },
    { 'Value': '2081N0008X', 'Display': 'Physical Medicine & Rehabilitation, Neuromuscular Medicine' },
    { 'Value': '2081P2900X', 'Display': 'Physical Medicine & Rehabilitation, Pain Medicine' },
    { 'Value': '2081P0010X', 'Display': 'Physical Medicine & Rehabilitation, Pediatric Rehabilitation Medicine' },
    { 'Value': '2081P0004X', 'Display': 'Physical Medicine & Rehabilitation, Spinal Cord Injury Medicine' },
    { 'Value': '2084P0800X', 'Display': 'Psychiatry' },
    { 'Value': '2085R0202X', 'Display': 'Radiology, Diagnostic Radiology' },
    { 'Value': '367H00000X', 'Display': 'Anesthesiologist Assistant' },
    { 'Value': '208800000X', 'Display': 'Urology' },
    { 'Value': '2088P0231X', 'Display': 'Urology, Pediatric Urology' },
    { 'Value': '2088F0040X', 'Display': 'Female Pelvic Medicine & Reconstructive Surgery' },
    { 'Value': '111N00000X', 'Display': 'Chiropractor' },
    { 'Value': '111NI0013X', 'Display': 'Chiropractor, Independent Medical Examiner' },
    { 'Value': '111NI0900X', 'Display': 'Chiropractor, Internist' },
    { 'Value': '111NN0400X', 'Display': 'Chiropractor, Neurology' },
    { 'Value': '111NN1001X', 'Display': 'Chiropractor, Nutrition' },
    { 'Value': '111NX0100X', 'Display': 'Chiropractor, Occupational Medicine' },
    { 'Value': '111NX0800X', 'Display': 'Chiropractor, Orthopedic' },
    { 'Value': '111NP0017X', 'Display': 'Chiropractor, Pediatric Chiropractor' },
    { 'Value': '111NR0200X', 'Display': 'Chiropractor, Radiology' },
    { 'Value': '111NR0400X', 'Display': 'Chiropractor, Rehabilitation' },
    { 'Value': '111NS0005X', 'Display': 'Chiropractor, Sports Physician' },
    { 'Value': '111NT0100X', 'Display': 'Chiropractor, Thermography' },
    { 'Value': '207U00000X', 'Display': 'Nuclear Medicine' },
    { 'Value': '207UN0903X', 'Display': 'Nuclear Medicine, In Vivo & In Vitro Nuclear Medicine' },
    { 'Value': '207UN0901X', 'Display': 'Nuclear Medicine, Nuclear Cardiology' },
    { 'Value': '207UN0902X', 'Display': 'Nuclear Medicine, Nuclear Imaging & Therapy' },
    { 'Value': '208000000X', 'Display': 'Pediatrics' },
    { 'Value': '2080A0000X', 'Display': 'Pediatrics, Adolescent Medicine' },
    { 'Value': '2080I0007X', 'Display': 'Pediatrics, Clinical & Laboratory Immunology' },
    { 'Value': '2080P0006X', 'Display': 'Pediatrics, DevelopmentalÐBehavioral Pediatrics' },
    { 'Value': '2080H0002X', 'Display': 'Pediatrics, Hospice and Palliative Medicine' },
    { 'Value': '2080T0002X', 'Display': 'Pediatrics, Medical Toxicology' },
    { 'Value': '2080N0001X', 'Display': 'Pediatrics, Neonatal-Perinatal Medicine' },
    { 'Value': '2080P0008X', 'Display': 'Pediatrics, Neurodevelopmental Disabilities' },
    { 'Value': '2080P0201X', 'Display': 'Pediatrics, Pediatric Allergy & Immunology' },
    { 'Value': '2080P0202X', 'Display': 'Pediatrics, Pediatric Cardiology' },
    { 'Value': '2080P0203X', 'Display': 'Pediatrics, Pediatric Critical Care Medicine' },
    { 'Value': '2080P0204X', 'Display': 'Pediatrics, Pediatric Emergency Medicine' },
    { 'Value': '2080P0205X', 'Display': 'Pediatrics, Pediatric Endocrinology' },
    { 'Value': '2080P0206X', 'Display': 'Pediatrics, Pediatric Gastroenterology' },
    { 'Value': '2080P0207X', 'Display': 'Pediatrics, Pediatric Hematology-Oncology' },
    { 'Value': '2080P0208X', 'Display': 'Pediatrics, Pediatric Infectious Diseases' },
    { 'Value': '2080P0210X', 'Display': 'Pediatrics, Pediatric Nephrology' },
    { 'Value': '2080P0214X', 'Display': 'Pediatrics, Pediatric Pulmonology' },
    { 'Value': '2080P0216X', 'Display': 'Pediatrics, Pediatric Rheumatology' },
    { 'Value': '2080T0004X', 'Display': 'Pediatrics, Pediatric Transplant Hepatology' },
    { 'Value': '2080S0012X', 'Display': 'Pediatrics, Sleep Medicine' },
    { 'Value': '152W00000X', 'Display': 'Optometrist' },
    { 'Value': '152WC0802X', 'Display': 'Optometrist, Corneal and Contact Management' },
    { 'Value': '152WL0500X', 'Display': 'Optometrist, Low Vision Rehabilitation' },
    { 'Value': '152WX0102X', 'Display': 'Optometrist, Occupational Vision' },
    { 'Value': '152WP0200X', 'Display': 'Optometrist, Pediatrics' },
    { 'Value': '152WS0006X', 'Display': 'Optometrist, Sports Vision' },
    { 'Value': '152WV0400X', 'Display': 'Optometrist, Vision Therapy' },
    { 'Value': '367A00000X', 'Display': 'Midwife, Certified Nurse' },
    { 'Value': '367500000X', 'Display': 'Nurse Anesthetist, Certified Registered' },
    { 'Value': '261QR0208X', 'Display': 'Clinic-Center, Radiology, Mammography' },
    { 'Value': '261QR0207X', 'Display': 'Clinic-Center, Radiology, Mobile Mammography' },
    { 'Value': '293D00000X', 'Display': 'Laboratories/Physiological Laboratory' },
    { 'Value': '213E00000X', 'Display': 'Podiatrist' },
    { 'Value': '213ES0103X', 'Display': 'Podiatrist, Foot & Ankle Surgery' },
    { 'Value': '213ES0131X', 'Display': 'Podiatrist, Foot Surgery' },
    { 'Value': '213EG0000X', 'Display': 'Podiatrist, General Practice' },
    { 'Value': '213EP1101X', 'Display': 'Podiatrist, Primary Podiatric Medicine' },
    { 'Value': '213EP0504X', 'Display': 'Podiatrist, Public Medicine' },
    { 'Value': '213ER0200X', 'Display': 'Podiatrist, Radiology' },
    { 'Value': '213ES0000X', 'Display': 'Podiatrist, Sports Medicine' },
    { 'Value': '261QA1903X', 'Display': 'Clinic-Center, Ambulatory Surgical' },
    { 'Value': '363L00000X', 'Display': 'Nurse Practitioner' },
    { 'Value': '363LA2100X', 'Display': 'Nurse Practitioner, Acute Care' },
    { 'Value': '363LA2200X', 'Display': 'Nurse Practitioner, Adult Health' },
    { 'Value': '363LC1500X', 'Display': 'Nurse Practitioner, Community Health' },
    { 'Value': '363LC0200X', 'Display': 'Nurse Practitioner, Critical Care Medicine' },
    { 'Value': '363LF0000X', 'Display': 'Nurse Practitioner, Family' },
    { 'Value': '363LG0600X', 'Display': 'Nurse Practitioner, Gerontology' },
    { 'Value': '363LN0000X', 'Display': 'Nurse Practitioner, Neonatal' },
    { 'Value': '363LN0005X', 'Display': 'Nurse Practitioner, Neonatal, Critical Care' },
    { 'Value': '363LX0001X', 'Display': 'Nurse Practitioner, Obstetrics & Gynecology' },
    { 'Value': '363LX0106X', 'Display': 'Nurse Practitioner, Occupational Health' },
    { 'Value': '363LP0200X', 'Display': 'Nurse Practitioner, Pediatrics' },
    { 'Value': '363LP0222X', 'Display': 'Nurse Practitioner, Pediatrics, Critical Care' },
    { 'Value': '363LP1700X', 'Display': 'Nurse Practitioner, Perinatal' },
    { 'Value': '363LP2300X', 'Display': 'Nurse Practitioner, Primary Care' },
    { 'Value': '363LP0808X', 'Display': 'Nurse Practitioner, Psychiatric/Mental Health' },
    { 'Value': '363LS0200X', 'Display': 'Nurse Practitioner, School' },
    { 'Value': '363LW0102X', 'Display': 'Nurse Practitioner, WomenÕs Health' },
    { 'Value': '335E00000X', 'Display': 'Prosthetic/Orthotic Supplier' },
    { 'Value': '332B00000X', 'Display': 'Durable Medical Equipment & Medical Supplies' },
    { 'Value': '222Z00000X', 'Display': 'Orthotist' },
    { 'Value': '224P00000X', 'Display': 'Prosthetist' },
    { 'Value': '333600000X', 'Display': 'Pharmacy' },
    { 'Value': '3336C0002X', 'Display': 'Clinic Pharmacy' },
    { 'Value': '3336C0003X', 'Display': 'Community/Retail Pharmacy' },
    { 'Value': '3336C0004X', 'Display': 'Compounding Pharmacy' },
    { 'Value': '3336H0001X', 'Display': 'Home Infusion Therapy Pharmacy' },
    { 'Value': '3336I0012X', 'Display': 'Institutional Pharmacy' },
    { 'Value': '3336L0003X', 'Display': 'Long-term Care Pharmacy' },
    { 'Value': '3336M0002X', 'Display': 'Mail Order Pharmacy' },
    { 'Value': '3336M0003X', 'Display': 'Managed Care Organization Pharmacy' },
    { 'Value': '3336N0007X', 'Display': 'Nuclear Pharmacy' },
    { 'Value': '3336S0011X', 'Display': 'Specialty Pharmacy' },
    { 'Value': '341600000X', 'Display': 'Ambulance' },
    { 'Value': '3416A0800X', 'Display': 'Ambulance, Air Transport' },
    { 'Value': '3416L0300X', 'Display': 'Ambulance, Land Transport' },
    { 'Value': '3416S0300X', 'Display': 'Ambulance, Water Transport' },
    { 'Value': '251K00000X', 'Display': 'Agencies/Public Health or Welfare' },
    { 'Value': '251V00000X', 'Display': 'Agencies/Voluntary or Charitable' },
    { 'Value': '103T00000X', 'Display': 'Psychologist' },
    { 'Value': '103TA0400X', 'Display': 'Psychologist, Addiction (Substance Abuse Disorder)' },
    { 'Value': '103TA0700X', 'Display': 'Psychologist, Adult Development & Aging' },
    { 'Value': '103TC0700X', 'Display': 'Psychologist, Clinical' },
    { 'Value': '103TC2200X', 'Display': 'Psychologist, Clinical Child & Adolescent' },
    { 'Value': '103TB0200X', 'Display': 'Psychologist, Cognitive & Behavioral' },
    { 'Value': '103TC1900X', 'Display': 'Psychologist, Counseling' },
    { 'Value': '103TE1000X', 'Display': 'Psychologist, Educational' },
    { 'Value': '103TE1100X', 'Display': 'Psychologist, Exercise & Sports' },
    { 'Value': '103TF0000X', 'Display': 'Psychologist, Family' },
    { 'Value': '103TF0200X', 'Display': 'Psychologist, Forensic' },
    { 'Value': '103TP2701X', 'Display': 'Psychologist, Group Psychotherapy' },
    { 'Value': '103TH0004X', 'Display': 'Psychologist, Health' },
    { 'Value': '103TH0100X', 'Display': 'Psychologist, Health Service' },
    { 'Value': '103TM1700X', 'Display': 'Psychologist, Men & Masculinity' },
    { 'Value': '103TM1800X', 'Display': 'Psychologist, Mental Retardation & Developmental Disabilities' },
    { 'Value': '103TP0016X', 'Display': 'Psychologist, Prescribing (Medical)' },
    { 'Value': '103TP0814X', 'Display': 'Psychologist, Psychoanalysis' },
    { 'Value': '103TP2700X', 'Display': 'Psychologist, Psychotherapy' },
    { 'Value': '103TR0400X', 'Display': 'Psychologist, Rehabilitation' },
    { 'Value': '103TS0200X', 'Display': 'Psychologist, School' },
    { 'Value': '103TW0100X', 'Display': 'Psychologist, Women' },
    { 'Value': '335V00000X', 'Display': 'Portable X-Ray Supplier' },
    { 'Value': '231H00000X', 'Display': 'Audiologist' },
    { 'Value': '231HA2400X', 'Display': 'Audiologist, Assistive Technology Practitioner' },
    { 'Value': '225100000X', 'Display': 'Physical Therapist' },
    { 'Value': '2251C2600X', 'Display': 'Physical Therapist, Cardiopulmonary' },
    { 'Value': '2251E1300X', 'Display': 'Physical Therapist, Electrophysiology, Clinical' },
    { 'Value': '2251E1200X', 'Display': 'Physical Therapist, Ergonomics' },
    { 'Value': '2251G0304X', 'Display': 'Physical Therapist, Geriatrics' },
    { 'Value': '2251H1200X', 'Display': 'Physical Therapist, Hand' },
    { 'Value': '2251H1300X', 'Display': 'Physical Therapist, Human Factors' },
    { 'Value': '2251N0400X', 'Display': 'Physical Therapist, Neurology' },
    { 'Value': '2251X0800X', 'Display': 'Physical Therapist, Orthopedic' },
    { 'Value': '2251P0200X', 'Display': 'Physical Therapist, Pediatrics' },
    { 'Value': '2251S0007X', 'Display': 'Physical Therapist, Sports' },
    { 'Value': '225X00000X', 'Display': 'Occupational Therapist' },
    { 'Value': '225XR0403X', 'Display': 'Occupational Therapist, Driving and Community Mobility' },
    { 'Value': '225XE0001X', 'Display': 'Occupational Therapist, Environmental Modification' },
    { 'Value': '225XE1200X', 'Display': 'Occupational Therapist, Ergonomics' },
    { 'Value': '225XF0002X', 'Display': 'Occupational Therapist, Feeding, Eating &Swallowing' },
    { 'Value': '225XG0600X', 'Display': 'Occupational Therapist, Gerontology' },
    { 'Value': '225XH1200X', 'Display': 'Occupational Therapist, Hand' },
    { 'Value': '225XH1300X', 'Display': 'Occupational Therapist, Human Factors' },
    { 'Value': '225XL0004X', 'Display': 'Occupational Therapist, Low Vision' },
    { 'Value': '225XM0800X', 'Display': 'Occupational Therapist, Mental Health' },
    { 'Value': '225XN1300X', 'Display': 'Occupational Therapist, Neurorehabilitation' },
    { 'Value': '225XP0200X', 'Display': 'Occupational Therapist, Pediatrics' },
    { 'Value': '225XP0019X', 'Display': 'Occupational Therapist, Physical Rehabilitation' },
    { 'Value': '291U00000X', 'Display': 'Laboratories/Clinical Medical Laboratory' },
    { 'Value': '261QM1300X', 'Display': 'Clinic/Center, Multi-Specialty' },
    { 'Value': '261QP2000X', 'Display': 'Clinic/Center, Physical Therapy' },
    { 'Value': '193200000X', 'Display': 'Group/Multi-Specialty' },
    { 'Value': '193400000X', 'Display': 'Group/Single-Specialty' },
    { 'Value': '133V00000X', 'Display': 'Dietician, Registered' },
    { 'Value': '133VN1006X', 'Display': 'Dietician, Registered, Nutrition, Metabolic' },
    { 'Value': '133VN1004X', 'Display': 'Dietician, Registered, Nutrition, Pediatric' },
    { 'Value': '133VN1005X', 'Display': 'Dietician, Registered, Nutrition, Renal' },
    { 'Value': '208VP0000X', 'Display': 'Pain Medicine, Pain Medicine' },
    { 'Value': '261QR0200X', 'Display': 'Clinic/Center, Radiology' },
    { 'Value': '247200000X', 'Display': 'Technologists, Technicians & Other Technical Service Providers/Technician, Other' },
    { 'Value': '2084A0401X', 'Display': 'Psychiatry & Neurology, Addiction Medicine' },
    { 'Value': '1041C0700X', 'Display': 'Social Worker, Clinical' },
    { 'Value': '2083A0100X', 'Display': 'Preventive Medicine, Aerospace Medicine' },
    { 'Value': '2083T0002X', 'Display': 'Preventive Medicine, Medical Toxicology' },
    { 'Value': '2083X0100X', 'Display': 'Preventive Medicine, Occupational Medicine' },
    { 'Value': '2083P0500X', 'Display': 'Preventive Medicine, Preventive Medicine/Occupational Environmental Medicine' },
    { 'Value': '2083P0901X', 'Display': 'Preventive Medicine, Public Health & General Preventive Medicine' },
    { 'Value': '2083P0011X', 'Display': 'Preventive Medicine, Undersea and Hyperbaric Medicine' },
    { 'Value': '2084P0802X', 'Display': 'Psychiatry & Neurology, Addiction Psychiatry' },
    { 'Value': '2084B0002X', 'Display': 'Psychiatry & Neurology, Bariatric Medicine' },
    { 'Value': '2084P0804X', 'Display': 'Psychiatry & Neurology, Child & Adolescent Psychiatry' },
    { 'Value': '2084N0600X', 'Display': 'Psychiatry & Neurology, Clinical Neurophysiology' },
    { 'Value': '2084D0003X', 'Display': 'Psychiatry & Neurology, Diagnostic Neuroimaging' },
    { 'Value': '2084F0202X', 'Display': 'Psychiatry & Neurology, Forensic Psychiatry' },
    { 'Value': '2084P0805X', 'Display': 'Psychiatry & Neurology, Geriatric Psychiatry' },
    { 'Value': '2084P0005X', 'Display': 'Psychiatry & Neurology, Neurodevelopmental Disabilities' },
    { 'Value': '2084N0008X', 'Display': 'Psychiatry & Neurology, Neuromuscular Medicine' },
    { 'Value': '2084P2900X', 'Display': 'Psychiatry & Neurology, Pain Medicine' },
    { 'Value': '2084P0015X', 'Display': 'Psychiatry & Neurology, Psychosomatic Medicine' },
    { 'Value': '2084S0012X', 'Display': 'Psychiatry & Neurology, Sleep Medicine' },
    { 'Value': '2084V0102X', 'Display': 'Psychiatry & Neurology, Vascular Neurology' },
    { 'Value': '364S00000X', 'Display': 'Clinical Nurse Specialist' },
    { 'Value': '364SA2100X', 'Display': 'Clinical Nurse Specialist, Acute Care' },
    { 'Value': '364SA2200X', 'Display': 'Clinical Nurse Specialist, Adult Health' },
    { 'Value': '364SC2300X', 'Display': 'Clinical Nurse Specialist, Chronic Care' },
    { 'Value': '364SC1501X', 'Display': 'Clinical Nurse Specialist, Community Health/Public Health' },
    { 'Value': '364SC0200X', 'Display': 'Clinical Nurse Specialist, Critical Care Medicine' },
    { 'Value': '364SE0003X', 'Display': 'Clinical Nurse Specialist, Emergency' },
    { 'Value': '364SE1400X', 'Display': 'Clinical Nurse Specialist, Ethics' },
    { 'Value': '364SF0001X', 'Display': 'Clinical Nurse Specialist, Family Health' },
    { 'Value': '364SG0600X', 'Display': 'Clinical Nurse Specialist, Gerontology' },
    { 'Value': '364SH1100X', 'Display': 'Clinical Nurse Specialist, Holistic' },
    { 'Value': '364SH0200X', 'Display': 'Clinical Nurse Specialist, Home Health' },
    { 'Value': '364SI0800X', 'Display': 'Clinical Nurse Specialist, Informatics' },
    { 'Value': '364SL0600X', 'Display': 'Clinical Nurse Specialist, Long-term Care' },
    { 'Value': '364SM0705X', 'Display': 'Clinical Nurse Specialist, Medical-Surgical' },
    { 'Value': '364SN0000X', 'Display': 'Clinical Nurse Specialist, Neonatal' },
    { 'Value': '364SN0800X', 'Display': 'Clinical Nurse Specialist, Neuroscience' },
    { 'Value': '364SX0106X', 'Display': 'Clinical Nurse Specialist, Occupational Health' },
    { 'Value': '364SX0200X', 'Display': 'Clinical Nurse Specialist, Oncology' },
    { 'Value': '364SX0204X', 'Display': 'Clinical Nurse Specialist, Oncology, Pediatrics' },
    { 'Value': '364SP0200X', 'Display': 'Clinical Nurse Specialist, Pediatrics' },
    { 'Value': '364SP1700X', 'Display': 'Clinical Nurse Specialist, Perinatal' },
    { 'Value': '364SP2800X', 'Display': 'Clinical Nurse Specialist, Perioperative' },
    { 'Value': '364SP0808X', 'Display': 'Clinical Nurse Specialist, Psychiatric/Mental Health' },
    { 'Value': '364SP0809X', 'Display': 'Clinical Nurse Specialist, Psychiatric/Mental Health, Adult' },
    { 'Value': '364SP0807X', 'Display': 'Clinical Nurse Specialist, Psychiatric/Mental Health, Child & Adolescent' },
    { 'Value': '364SP0810X', 'Display': 'Clinical Nurse Specialist, Psychiatric/Mental Health, Child & Family' },
    { 'Value': '364SP0811X', 'Display': 'Clinical Nurse Specialist, Psychiatric/Mental Health, Chronically Ill' },
    { 'Value': '364SP0812X', 'Display': 'Clinical Nurse Specialist, Psychiatric/Mental Health, Community' },
    { 'Value': '364SP0813X', 'Display': 'Clinical Nurse Specialist, Psychiatric/Mental Health, Geropsychiatric' },
    { 'Value': '364SR0400X', 'Display': 'Clinical Nurse Specialist, Rehabilitation' },
    { 'Value': '364SS0200X', 'Display': 'Clinical Nurse Specialist, School' },
    { 'Value': '364ST0500X', 'Display': 'Clinical Nurse Specialist, Transplantation' },
    { 'Value': '364SW0102X', 'Display': 'Clinical Nurse Specialist, WomenÕs Health' },
    { 'Value': '2085R0001X', 'Display': 'Radiology, Radiation Oncology' },
    { 'Value': '207P00000X', 'Display': 'Emergency Medicine' },
    { 'Value': '207PE0004X', 'Display': 'Emergency Medicine, Emergency Medical Services' },
    { 'Value': '207PT0002X', 'Display': 'Emergency Medicine, Medical Toxicology' },
    { 'Value': '207PP0204X', 'Display': 'Emergency Medicine, Pediatric Emergency Medicine' },
    { 'Value': '207PE0005X', 'Display': 'Emergency Medicine, Undersea and Hyperbaric Medicine' },
    { 'Value': '2085R0204X', 'Display': 'Radiology, Vascular and Interventional Radiology' },
    { 'Value': '2085H0002X', 'Display': 'Hospice & Palliative Medicine' },
    { 'Value': '156FX1800X', 'Display': 'Eye & Vision Service Providers/Technician/Technologist, Optician' },
    { 'Value': '363A00000X', 'Display': 'Physician Assistant' },
    { 'Value': '363AM0700X', 'Display': 'Physician Assistant, Medical' },
    { 'Value': '363AS0400X', 'Display': 'Physician Assistant, Surgical' },
    { 'Value': '282N00000X', 'Display': 'Hospitals/General Acute Care' },
    { 'Value': '282NC2000X', 'Display': 'Hospital Hospitals/General Acute Care' },
    { 'Value': '282E00000X', 'Display': 'Hospital, Children Hospitals/Long Term Care' },
    { 'Value': '283Q00000X', 'Display': 'Hospital Hospitals/Psychiatric' },
    { 'Value': '283X00000X', 'Display': 'Hospital Hospitals/Rehabilitation' },
    { 'Value': '2843000000', 'Display': '	Hospital Hospitals/Special(ty) Hospital' },
    { 'Value': '275N00000X', 'Display': 'Hospital Units/Medicare Defined Swing Bed Unit' },
    { 'Value': '273R00000X', 'Display': 'Hospital Units/Psychiatric Unit' },
    { 'Value': '273Y00000X', 'Display': 'Hospital Units/Rehabilitation Unit' },
    { 'Value': '284300000X', 'Display': 'Hospitals/Special(ty) Hospital' },
    { 'Value': '282NC0060X', 'Display': 'Hospitals/General Acute Care Hospital, Critical Access' },
    { 'Value': '314000000X', 'Display': 'Nursing and Custodial Care Facilities/Skilled Nursing Facility' },
    { 'Value': '313M00000X', 'Display': 'Nursing and Custodial Care Facilities/Nursing Facility' },
    { 'Value': '251E00000X', 'Display': 'Agencies/Home Health' },
    { 'Value': '332BX2000X', 'Display': 'Durable Medical Equipment & Medical Supplies, Oxygen Equipment & Supplies' },
    { 'Value': '261QR0400X', 'Display': 'Clinic/Center, Rehabilitation' },
    { 'Value': '335U00000X', 'Display': 'Organ Procurement Organization' },
    { 'Value': '261QM0801X', 'Display': 'Center, Mental Health' },
    { 'Value': '261QR0401X', 'Display': 'Center, Rehabilitation, Comprehensive Outpatient Rehabilitation Facility (CORF)' },
    { 'Value': '261QE0700X', 'Display': 'End-Stage Renal Disease (ESRD) Treatment' },
    { 'Value': '261QF0400X', 'Display': 'Federally Qualified Health Center (FQHC)' },
    { 'Value': '251G00000X', 'Display': 'Agencies/Hospice Care, Community Based' },
    { 'Value': '291900000X', 'Display': 'Laboratories/Military Clinical Medical Laboratory' }
  ];

}
