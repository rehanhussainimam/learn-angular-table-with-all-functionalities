import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { UsersService } from "../../services/users.service";
import { RefDataService } from "../../services/ref-data.service";
import { User } from "../../models/user";

@Component({
  selector: "app-user-details",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent {
  user$ = this.usersService.user$;

  loading$ = this.usersService.loading$;

  saving$ = this.usersService.saving$;

  saved$ = this.usersService.saved$;

  error$ = this.usersService.error$;

  titles$ = this.refDataService.titles$;

  password = "";

  passwordAgain = "";

  constructor(
    private usersService: UsersService,
    private refDataService: RefDataService,
    route: ActivatedRoute
  ) {
    usersService.load();
    const userId = route.snapshot.paramMap.get("id");
    usersService.select(userId ? parseInt(userId) : undefined);
  }

  save(user: User) {
    this.usersService.save(user);
  }
}
