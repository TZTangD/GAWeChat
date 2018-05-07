using AutoMapper;

namespace HC.WeChat.Employees.Dtos.LTMAutoMapper
{
    using HC.WeChat.Employees;

    /// <summary>
    /// 配置Employee的AutoMapper
    /// </summary>
    internal static class CustomerEmployeeMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            //    configuration.CreateMap <Employee, EmployeeDto>();
            configuration.CreateMap<Employee, EmployeeListDto>();
            configuration.CreateMap<EmployeeEditDto, Employee>();
            // configuration.CreateMap<CreateEmployeeInput, Employee>();
            //        configuration.CreateMap<Employee, GetEmployeeForEditOutput>();
        }
    }
}