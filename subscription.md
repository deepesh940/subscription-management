# Subscription Management – ERP Central

**Implementation Specification (Antigravity Compatible)**

---

## 1. Purpose

Design and implement a subscription management engine in ERP Central that controls product access, modules, roles, permissions, and usage limits based on customer subscription plans.

This will act as the licensing and governance layer across the entire ERP ecosystem.

---

## 2. Objectives

* Enable plan-based module activation
* Control user creation and permissions by subscription
* Manage billing lifecycle (trial → active → renewal → expiry)
* Restrict system access automatically based on plan limits
* Provide a scalable multi-tenant subscription architecture

---

## 3. Scope

### Included

* Subscription plan master
* Plan-based roles
* Access rights engine
* Customer subscription management
* Usage tracking
* Lifecycle automation
* Billing integration hooks

### Excluded (Phase 2)

* Payment gateway implementation
* Marketplace add-ons
* API monetization engine

---

## 4. Core Architecture

Subscription Layer sits above:

Customer
→ Company
→ Branch
→ Users
→ Modules
→ Features

All access originates from subscription permissions.

---

## 5. Key Components

## 5.1 Subscription Plan Master

### Fields

* Plan ID
* Plan Name
* Plan Type (Trial / Monthly / Yearly / Enterprise)
* Pricing
* Validity
* Renewal cycle
* Upgrade allowed (Y/N)
* Downgrade allowed (Y/N)
* Status

### Limits Configuration

* Max users
* Max external users
* Max companies
* Max branches
* Storage limit
* API usage limit

### Module Entitlement

* HRMS
* Finance
* Inventory
* CRM
* Procurement
* Manufacturing
* Custom modules

---

## 5.2 Plan-Based Role Engine

Each subscription plan includes role templates.

### Example

Starter

* Admin
* Standard User

Professional

* Admin
* Finance Manager
* HR Manager
* Operations Manager

Enterprise

* Custom role creation allowed

---

## 5.3 Access Rights Engine

Triggered when:

* Plan created
* Plan selected
* Plan updated

### Permission Levels

#### Module Level

Enable / Disable modules

#### Feature Level

Within modules:

* View
* Create
* Edit
* Delete
* Approve
* Export
* Configure

#### Role Level

Mapping:
Plan → Role → Permissions

#### Data Scope

* Branch level
* Department level
* Company level
* Document level

#### Financial Limits

* Approval thresholds
* Budget restrictions

---

## 6. Access Rights Matrix Structure

```
Plan
 └── Module
      └── Feature
           └── Role
                └── Permission Flags
```

Example:

Plan: Professional
Module: Finance
Feature: Journal Entry
Role: Finance Manager

Permissions:

* View: TRUE
* Create: TRUE
* Edit: TRUE
* Delete: FALSE
* Approve: TRUE

---

## 7. Customer Subscription Management

### Fields

* Customer ID
* Assigned Plan
* Activation date
* Expiry date
* Renewal type
* Billing cycle
* Status

### Status Types

* Trial
* Active
* Suspended
* Expired
* Cancelled

---

## 8. Subscription Lifecycle

### Flow

1. Plan Purchase
2. Trial Start
3. Activation
4. Usage Monitoring
5. Renewal Notification
6. Payment Confirmation
7. Renewal
8. Upgrade / Downgrade
9. Expiry
10. Access Restriction

---

## 9. Usage & Limit Tracking

System must track:

* Users created vs allowed
* Storage consumption
* API calls
* Module usage
* Role usage

Trigger alerts when:

* 80% usage reached
* Limits exceeded

---

## 10. Governance Controls

Mandatory:

* Prevent module access outside plan

* Disable permissions after downgrade

* Audit log for:

  * Role changes
  * Plan changes
  * Access updates

* Plan versioning

* Plan cloning

---

## 11. UI Structure

### Navigation

Applications → Subscription Management

### Screens

#### 1. Plan Master

* Create / Edit plans
* Configure modules
* Configure limits

#### 2. Plan Roles

* Default roles
* Role templates

#### 3. Access Rights

Matrix-based permission configuration

#### 4. Customer Subscriptions

* Assign plans
* Manage lifecycle

#### 5. Usage Dashboard

* Limits vs usage
* Alerts

#### 6. Billing

* Invoices
* Renewal tracking

---

## 12. Database Design

### Tables

#### subscription_plan

* id
* name
* type
* price
* validity
* status

#### subscription_limits

* plan_id
* max_users
* max_branches
* storage_limit
* api_limit

#### subscription_modules

* plan_id
* module_id
* enabled

#### plan_roles

* id
* plan_id
* role_name

#### role_permissions

* role_id
* module
* feature
* can_view
* can_create
* can_edit
* can_delete
* can_approve

#### customer_subscriptions

* id
* customer_id
* plan_id
* start_date
* end_date
* status

#### usage_tracking

* subscription_id
* users_used
* storage_used
* api_calls

---

## 13. Permission Engine Logic

### Rule Hierarchy

Subscription
→ Role
→ Module
→ Feature
→ User

System checks in this order.

If subscription denies → stop access.

---

## 14. Automation Rules

### Expiry

* Lock modules
* Restrict login
* Send alerts

### Upgrade

* Enable additional modules
* Increase limits

### Downgrade

* Remove excess users
* Disable premium features

---

## 15. Reports

* Active subscriptions
* Expiring soon
* Plan revenue
* Usage vs limits
* Feature adoption
* Role utilization

---

## 16. Integration Points

* Billing system
* Identity management
* Access control engine
* Notification service

---

## 17. Security Considerations

* Role permission encryption
* Audit trails mandatory
* Admin override logs
* Plan modification approvals

---

## 18. Scalability Design

Must support:

* Multi-tenant
* Region-based pricing
* Add-on modules
* Per-user pricing
* Enterprise custom licensing

---

## 19. Development Phases

### Phase 1

* Plan master
* Role templates
* Access matrix
* Customer subscriptions

### Phase 2

* Billing integration
* Usage automation
* Renewal engine

### Phase 3

* Marketplace
* Add-ons
* API monetization

---

## 20. Deliverables

* BRD
* SRS
* DB schema
* UI wireframes
* Permission matrix template
* Workflow diagrams

---

## 21. Success Criteria

* Plan-based access enforcement works across modules
* No unauthorized feature access
* Automatic restriction after expiry
* Full audit traceability
* Real-time usage monitoring

---

**End of Document**
