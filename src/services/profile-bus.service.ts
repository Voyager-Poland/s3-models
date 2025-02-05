import { Injectable } from "@angular/core";
import { EventBus } from "../abstract/event-bus";
import { ProfileTokenModel } from "../models/profile.token.model";

export class ProfileEventBusService extends EventBus<ProfileTokenModel> {
  constructor() {
    super(ProfileTokenModel.Empty());
  }
}
