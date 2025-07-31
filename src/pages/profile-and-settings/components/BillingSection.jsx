import React, { useState } from 'react';
import Button from '../../../components/ui/Button';

import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const BillingSection = () => {
  const [currentPlan] = useState({
    name: 'Professional',
    price: 15,
    billing: 'monthly',
    features: [
      'Unlimited cards and whiteboards',
      'Advanced collaboration tools',
      'Priority support',
      '50GB storage',
      'Export in all formats',
      'Advanced analytics'
    ]
  });

  const [billingHistory] = useState([
    {
      id: 1,
      date: '2025-01-01',
      description: 'Professional Plan - Monthly',
      amount: 15.00,
      status: 'paid',
      invoice: 'INV-2025-001'
    },
    {
      id: 2,
      date: '2024-12-01',
      description: 'Professional Plan - Monthly',
      amount: 15.00,
      status: 'paid',
      invoice: 'INV-2024-012'
    },
    {
      id: 3,
      date: '2024-11-01',
      description: 'Professional Plan - Monthly',
      amount: 15.00,
      status: 'paid',
      invoice: 'INV-2024-011'
    },
    {
      id: 4,
      date: '2024-10-01',
      description: 'Professional Plan - Monthly',
      amount: 15.00,
      status: 'paid',
      invoice: 'INV-2024-010'
    }
  ]);

  const [paymentMethod] = useState({
    type: 'card',
    last4: '4242',
    brand: 'Visa',
    expiryMonth: 12,
    expiryYear: 2027
  });

  const [billingAddress] = useState({
    name: 'Dr. Sarah Chen',
    company: 'University Research Lab',
    address1: '123 Academic Drive',
    address2: 'Suite 456',
    city: 'Boston',
    state: 'MA',
    zip: '02115',
    country: 'US'
  });

  const [autoRenew, setAutoRenew] = useState(true);
  const [emailReceipts, setEmailReceipts] = useState(true);
  const [usageAlerts, setUsageAlerts] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const plans = [
    {
      name: 'Free',
      price: 0,
      billing: 'forever',
      features: [
        '10 cards per project',
        '1 whiteboard',
        'Basic collaboration',
        '1GB storage',
        'Community support'
      ],
      current: false
    },
    {
      name: 'Professional',
      price: 15,
      billing: 'monthly',
      features: [
        'Unlimited cards and whiteboards',
        'Advanced collaboration tools',
        'Priority support',
        '50GB storage',
        'Export in all formats',
        'Advanced analytics'
      ],
      current: true
    },
    {
      name: 'Team',
      price: 45,
      billing: 'monthly',
      features: [
        'Everything in Professional',
        'Team management',
        'Advanced permissions',
        '200GB storage',
        'Custom integrations',
        'Dedicated support'
      ],
      current: false
    }
  ];

  const handlePlanChange = (planName) => {
    console.log('Changing to plan:', planName);
    alert(`Plan change to ${planName} initiated. You will receive a confirmation email.`);
  };

  const handleUpdatePaymentMethod = () => {
    console.log('Updating payment method');
    alert('Payment method update form would open here.');
  };

  const handleDownloadInvoice = (invoice) => {
    console.log('Downloading invoice:', invoice);
    alert(`Downloading invoice ${invoice}`);
  };

  const handleCancelSubscription = () => {
    console.log('Canceling subscription');
    setShowCancelModal(false);
    alert('Subscription cancellation initiated. You will receive a confirmation email.');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'text-success';
      case 'pending': return 'text-warning';
      case 'failed': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid': return 'CheckCircle';
      case 'pending': return 'Clock';
      case 'failed': return 'XCircle';
      default: return 'Circle';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Billing & Subscription</h2>
        <p className="text-muted-foreground mt-1">
          Manage your subscription, payment methods, and billing history
        </p>
      </div>

      {/* Current Plan */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Icon name="CreditCard" size={20} className="text-primary" />
            <h3 className="text-lg font-medium text-foreground">Current Plan</h3>
          </div>
          <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
            {currentPlan.name}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="flex items-baseline space-x-2 mb-4">
              <span className="text-3xl font-bold text-foreground">${currentPlan.price}</span>
              <span className="text-muted-foreground">/{currentPlan.billing}</span>
            </div>
            <ul className="space-y-2">
              {currentPlan.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2 text-sm">
                  <Icon name="Check" size={16} className="text-success" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium text-foreground mb-2">Next billing date</h4>
              <p className="text-sm text-muted-foreground">February 1, 2025</p>
            </div>
            
            <div className="space-y-2">
              <Checkbox
                label="Auto-renew subscription"
                description="Automatically renew when your current period ends"
                checked={autoRenew}
                onChange={(e) => setAutoRenew(e.target.checked)}
              />
              
              <Checkbox
                label="Email receipts"
                description="Send payment receipts to your email"
                checked={emailReceipts}
                onChange={(e) => setEmailReceipts(e.target.checked)}
              />
              
              <Checkbox
                label="Usage alerts"
                description="Notify when approaching plan limits"
                checked={usageAlerts}
                onChange={(e) => setUsageAlerts(e.target.checked)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Available Plans */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Available Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-6 rounded-lg border-2 transition-all ${
                plan.current 
                  ? 'border-primary bg-primary/5' :'border-border bg-card hover:border-primary/50'
              }`}
            >
              {plan.current && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                    Current Plan
                  </span>
                </div>
              )}
              
              <div className="text-center mb-4">
                <h4 className="text-lg font-semibold text-foreground">{plan.name}</h4>
                <div className="flex items-baseline justify-center space-x-1 mt-2">
                  <span className="text-2xl font-bold text-foreground">${plan.price}</span>
                  <span className="text-muted-foreground">/{plan.billing}</span>
                </div>
              </div>
              
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm">
                    <Icon name="Check" size={14} className="text-success" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                variant={plan.current ? "outline" : "default"}
                fullWidth
                onClick={() => !plan.current && handlePlanChange(plan.name)}
                disabled={plan.current}
              >
                {plan.current ? 'Current Plan' : `Upgrade to ${plan.name}`}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Icon name="CreditCard" size={20} className="text-primary" />
            <h3 className="text-lg font-medium text-foreground">Payment Method</h3>
          </div>
          <Button
            variant="outline"
            onClick={handleUpdatePaymentMethod}
            iconName="Edit"
            iconPosition="left"
            iconSize={16}
          >
            Update
          </Button>
        </div>
        
        <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
          <div className="w-12 h-8 bg-primary rounded flex items-center justify-center">
            <Icon name="CreditCard" size={20} color="white" />
          </div>
          <div>
            <p className="font-medium text-foreground">
              {paymentMethod.brand} ending in {paymentMethod.last4}
            </p>
            <p className="text-sm text-muted-foreground">
              Expires {paymentMethod.expiryMonth}/{paymentMethod.expiryYear}
            </p>
          </div>
        </div>
      </div>

      {/* Billing Address */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Icon name="MapPin" size={20} className="text-primary" />
            <h3 className="text-lg font-medium text-foreground">Billing Address</h3>
          </div>
          <Button
            variant="outline"
            iconName="Edit"
            iconPosition="left"
            iconSize={16}
          >
            Update
          </Button>
        </div>
        
        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="space-y-1 text-sm">
            <p className="font-medium text-foreground">{billingAddress.name}</p>
            {billingAddress.company && (
              <p className="text-muted-foreground">{billingAddress.company}</p>
            )}
            <p className="text-muted-foreground">{billingAddress.address1}</p>
            {billingAddress.address2 && (
              <p className="text-muted-foreground">{billingAddress.address2}</p>
            )}
            <p className="text-muted-foreground">
              {billingAddress.city}, {billingAddress.state} {billingAddress.zip}
            </p>
            <p className="text-muted-foreground">United States</p>
          </div>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Billing History</h3>
        <div className="space-y-3">
          {billingHistory.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-4">
                <Icon 
                  name={getStatusIcon(item.status)} 
                  size={20} 
                  className={getStatusColor(item.status)} 
                />
                <div>
                  <p className="font-medium text-foreground">{item.description}</p>
                  <p className="text-sm text-muted-foreground">{formatDate(item.date)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-medium text-foreground">${item.amount.toFixed(2)}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDownloadInvoice(item.invoice)}
                  iconName="Download"
                  iconPosition="left"
                  iconSize={14}
                >
                  Invoice
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cancel Subscription */}
      <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="AlertTriangle" size={20} className="text-destructive" />
          <h3 className="text-lg font-medium text-foreground">Cancel Subscription</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Cancel your subscription at any time. You'll continue to have access until the end of your current billing period.
        </p>
        <Button
          variant="destructive"
          onClick={() => setShowCancelModal(true)}
          iconName="XCircle"
          iconPosition="left"
          iconSize={16}
        >
          Cancel Subscription
        </Button>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="AlertTriangle" size={24} className="text-destructive" />
              <h3 className="text-lg font-medium text-foreground">Cancel Subscription</h3>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              Are you sure you want to cancel your subscription? You'll lose access to premium features at the end of your current billing period.
            </p>
            
            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-foreground mb-2">What you'll lose:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Unlimited cards and whiteboards</li>
                <li>• Advanced collaboration tools</li>
                <li>• Priority support</li>
                <li>• Export capabilities</li>
                <li>• Advanced analytics</li>
              </ul>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowCancelModal(false)}
              >
                Keep Subscription
              </Button>
              <Button
                variant="destructive"
                onClick={handleCancelSubscription}
              >
                Cancel Subscription
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingSection;