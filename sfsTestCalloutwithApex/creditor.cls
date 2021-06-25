public class creditor {
   
	public Integer id;
	public String creditorName;
	public String firstName;
	public String lastName;
	public Double minPaymentPercentage;
	public Double balance;

	
	public static List<creditor> parse(String json) {
		return (List<creditor>) System.JSON.deserialize(json, List<creditor>.class);
	}


}