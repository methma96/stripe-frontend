import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-account-onboarding',
  templateUrl: './account-onboarding.component.html',
  styleUrls: ['./account-onboarding.component.css']
})
export class AccountOnboardingComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) {}

  accountId: string | null = null;

  private async fetchClientSecret(): Promise<string> {
    const response = await fetch('http://localhost:8080/api/payments/account_session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accountId: this.accountId })
    });

    if (!response.ok) {
      const { error } = await response.json();
      console.error('Error fetching client secret:', error);
      throw new Error('Failed to fetch client secret');
    }

    const { clientSecret } = await response.json();
    if (!clientSecret) throw new Error('Client secret is undefined');
    return clientSecret;
  }

  async ngOnInit() {

    // Get the accountId from the query parameter
    this.accountId = this.route.snapshot.queryParamMap.get('accountId');
    if (!this.accountId) {
      console.error('Account ID is missing in the query parameters');
      return; // Exit if accountId is missing
    }

    if (typeof window !== 'undefined') { // Check if in browser
      const { loadConnectAndInitialize } = await import('@stripe/connect-js/pure');
      

      const stripeConnectInstance = await loadConnectAndInitialize({
        publishableKey: "pk_test_51Pv9zYIhwUT0ZWX41pej2W8IpYIXoYsOEZ9PBIEBfHqCep3INEGWs11w66ecrIQQjQdi9KpLLbyhH4qR7quBYKT300WSeHoZmU",
        fetchClientSecret: this.fetchClientSecret.bind(this),
      });

      const accountOnboarding = stripeConnectInstance.create('account-onboarding');
      accountOnboarding.setOnExit(() => {
        console.log('User exited the onboarding flow');
          // Redirect to another screen
          this.router.navigate(['/onboarding-complete'], {
            queryParams: { accountId: this.accountId }
          });
      });

      const container = document.getElementById("container");
      if (container) container.appendChild(accountOnboarding);
    }
  }
}
