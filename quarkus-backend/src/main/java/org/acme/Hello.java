package org.acme;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class Hello {
  @NotNull
  @Size(min = 2, max = 25)
  private String name;

  public void setName(String name) {
    this.name = name;
  }

  public String getName() {
    return name;
  }
}
