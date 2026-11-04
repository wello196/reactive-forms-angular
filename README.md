# Angular 18 Reactive Forms & Auth Application

A comprehensive, production-grade authentication and user registration system built with **Angular 18 Standalone Components** and **Reactive Forms (`ReactiveFormsModule`)**. This application demonstrates advanced form architecture including nested form groups (`FormGroup`), dynamic form arrays (`FormArray`), cross-field validation, custom function validators, and fine-grained UI error handling.

---

## 🔗 Live Demo

Experience the live application online:  
🚀 **[View Live Demo](https://reactive-forms-angular-peach.vercel.app/)** 

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Main Features](#-main-features)
- [Technologies & Tech Stack](#-technologies--tech-stack)
- [Application Architecture](#-application-architecture)
- [Folder Structure](#-folder-structure)
- [Form Validation Architecture](#-form-validation-architecture)
- [Components Documentation](#-components-documentation)
- [Data Flow Pipeline](#-data-flow-pipeline)
- [Installation & Setup](#-installation--setup)
- [Development Commands](#-development-commands)

---

## 🌟 Project Overview

The **Angular Forms & Auth** project showcases enterprise-level form management and client-side validation logic in Angular 18. Replacing standard template-driven forms with explicit reactive models (`FormBuilder`), it delivers full programmatic control over form state, touch/dirty tracking, field dependencies, and custom validation pipelines.

---

## ✨ Main Features

* **Complex Reactive Registration (`SignupComponent`):** Multi-section registration form with nested address structures, role selection, dynamic checkbox sources (`FormArray`), and terms agreement.
* **Custom Cross-Field Validation:** High-order validator factory (`equalValues`) verifying password matching across distinct controls within nested form groups.
* **Custom Functional Validation:** Synchronous custom control validator (`mustContainQuestionMark`) enforcing specific password formatting rules.
* **Granular UI Error Messaging:** Reactive feedback utilizing Angular 18 control flow (`@if`) combined with control status getters (`touched`, `dirty`, `invalid`).
* **Standalone Architecture:** Clean component modularity leveraging Angular 18 standalone components without `NgModule` declarations.
* **Bootstrap Integration:** Responsive layout framework using Bootstrap 5 (`^5.3.8`).

---

## 🛠️ Technologies & Tech Stack

* **Framework:** Angular 18.0.0 (`@angular/core`, `@angular/common`, `@angular/forms`, `@angular/router`)
* **Styling & UI:** Bootstrap `5.3.8` & Custom CSS3
* **Forms Paradigm:** `@angular/forms` (`ReactiveFormsModule`, `FormBuilder`, `FormGroup`, `FormControl`, `FormArray`, `Validators`)
* **Language:** TypeScript (`~5.4.2`)
* **Build Tool:** Angular CLI 18.0.0

---

## 🏛️ Application Architecture

```text
AppComponent (Root Orchestrator)
 ├── Header Branding Layout
 └── SignupComponent (Complex Reactive Form Registration)
      └── [Optional] LoginComponent (Authentication Form)
```

### Component Topology & Form Hierarchy

* **`AppComponent`**: Container hosting header elements and active auth views.
* **`LoginComponent`**: Single-level `FormGroup` controlling `email` and `password` inputs.
* **`SignupComponent`**: Injects `FormBuilder` to orchestrate a complex tree structure:
  * `email`: Single `FormControl`
  * `passwords`: Nested `FormGroup` (`password`, `confirmPassword`) with `equalValues` group validator
  * `name`: Nested `FormGroup` (`fName`, `lName`)
  * `address`: Nested `FormGroup` (`street`, `number`, `postalCode`, `city`)
  * `role`: Dropdown select `FormControl`
  * `source`: `FormArray` managing dynamic acquisition channels
  * `agree`: Boolean `FormControl` (`Validators.requiredTrue`)

---

## 📂 Folder Structure

```text
src/
├── app/
│   ├── auth/
│   │   ├── login/
│   │   │   ├── login.component.css
│   │   │   ├── login.component.html
│   │   │   └── login.component.ts
│   │   └── signup/
│   │       ├── signup.component.css
│   │       ├── signup.component.html
│   │       └── signup.component.ts
│   ├── app.component.css
│   ├── app.component.html
│   └── app.component.ts
├── assets/
│   └── logo.jpg
├── index.html
├── main.ts
└── styles.css
```

---

## 📐 Form Validation Architecture

### Custom Validators

#### 1. Synchronous Control Validator (`mustContainQuestionMark`)
Checks whether a single input control string includes the `?` character:
```typescript
function mustContainQuestionMark(control: AbstractControl): ValidationErrors | null {
  if (control.value.includes('?')) return null;
  return { mustContainQuestionMark: true };
}
```

#### 2. Factory Cross-Field Validator (`equalValues`)
A higher-order validator comparing two child control values within a parent `FormGroup`:
```typescript
function equalValues(control1: string, control2: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const val1 = control.get(control1)?.value;
    const val2 = control.get(control2)?.value;
    if (val1 === val2) return null;
    return { notEqual: true };
  };
}
```

---

## 🧩 Components Documentation

### 1. `AppComponent`
* **Selector:** `app-root`
* **Imports:** `SignupComponent`, `LoginComponent`
* **Responsibility:** Top-level application shell rendering branding headers and active form modules.

### 2. `LoginComponent`
* **Selector:** `app-login`
* **Imports:** `ReactiveFormsModule`
* **Form Architecture:** Direct `FormGroup` instantiation.
* **Validation:** Email format, min/max length, and `mustContainQuestionMark`.
* **Behavior:** Automatically marks all controls as touched and dirty on submission if invalid.

### 3. `SignupComponent`
* **Selector:** `app-signup`
* **Imports:** `ReactiveFormsModule`
* **Injected Services:** `FormBuilder`
* **Key Getters:** Computes validity states for UI error triggers (`emailIsInvalid`, `passwordIsInvalid`, `singlePasswordIsInvalid`, `fNameIsInvalid`, `lNameIsInvalid`, `addressIsInvalid`, `agreeIsInvalid`).
* **Methods:**
  * `onSubmit()`: Emits form payload if valid; marks all controls and nested group controls as touched/dirty if invalid.
  * `onReset()`: Resets all controls and restores submission state flags.

---

## 🔄 Data Flow Pipeline

```text
User Input Event (Keystroke / Checkbox / Selection)
       │
       ▼
Reactive Control / Group State Update (FormGroup Model)
       │
       ▼
Validation Execution (Built-in + Custom Synchronous & Cross-Field Validators)
       │
       ▼
Getter Re-evaluation (touched && dirty && invalid check)
       │
       ▼
Template UI Feedback (@if control block renders error message)
       │
       ▼
Form Submission Trigger (onSubmit -> Reset or Mark Controls as Touched)
```

---

## 🚀 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd forms
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   ng serve
   ```
   Navigate to `http://localhost:4200/` in your browser.

4. **Build for production:**
   ```bash
   ng build
   ```
