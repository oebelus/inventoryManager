package dev.server.user;

public class User {
    private Long id;
    private String email;
    private String password;
    private String firstName;
    private String familyName;

    public User() {

    }

    public User(Long id, String email, String password, String firstName, String familyName) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.familyName = familyName;
    }

    public User(String email, String password, String firstName, String familyName) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.familyName = familyName;
    }

    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }


    public String getEmail() {
        return email;
    }


    public void setEmail(String email) {
        this.email = email;
    }


    public String getPassword() {
        return password;
    }


    public void setPassword(String password) {
        this.password = password;
    }


    public String getFirstName() {
        return firstName;
    }


    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }


    public String getFamilyName() {
        return familyName;
    }


    public void setFamilyName(String familyName) {
        this.familyName = familyName;
    }

    @Override
    public String toString() {
        return "User [id=" + id + ", email=" + email + ", password=" + password + ", firstName=" + firstName
                + ", familyName=" + familyName + "]";
    }
}
